import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import ProgressBar from './ProgressBar';
import SegmentOne from './catform-segments/SegmentOne';
import SegmentTwo from './catform-segments/SegmentTwo';
import SegmentThree from './catform-segments/SegmentThree';
import SegmentFour from './catform-segments/SegmentFour';
import { AnimalService } from '@/Services';
import { Animal } from '@/Services/types';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/Components/ui/button';

// JWT Payload interface
interface JwtPayload {
  company?: string;
  [key: string]: any;
}

const defaultFormData: Partial<Animal> = {
  petName: '',
  petBirth: undefined,
  petGender: '',
  petObs: '',
  petPicture: '',
  petCharacteristics: {
    petCastrated: '',
    petBreed: '',
    petSize: '',
  },
  physicalCharacteristics: {
    furColor: '',
    furLength: '',
    eyeColor: '',
    size: 0,
    weight: 0,
  },
  behavioralCharacteristics: {
    personality: '',
    activityLevel: '',
    socialBehavior: '',
    meow: '',
  },
  petComorbidities: '',
  petVaccines: [],
  company: '',
  petStatus: {
    petCurrentStatus: '0',
    petOccurrencesQuantity: 0,
    petLastOccurrence: null,
  }
};

// Segment types
type SegmentType = 'basic' | 'physical' | 'behavioral' | 'medical';

const CatForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Animal>>(defaultFormData);
  const [activeSegment, setActiveSegment] = useState<SegmentType>('basic');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completedSegments, setCompletedSegments] = useState<Record<SegmentType, boolean>>({
    basic: false,
    physical: false,
    behavioral: false,
    medical: false,
  });
  const [progress, setProgress] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(Boolean(id));

  // Fetch cat data if in edit mode and get company ID from token
  useEffect(() => {
    // Get company ID from token
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.company) {
          // Set the company in form data
          setFormData(prev => ({
            ...prev,
            company: decoded.company
          }));
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    
    if (id) {
      const fetchCatData = async () => {
        try {
          setIsLoading(true);
          const catData = await AnimalService.getOne(id);
          setFormData(catData);
          setIsEditing(true);
          
          // Determine which segments are completed
          const completed = {
            basic: Boolean(catData.petName && catData.petGender),
            physical: Boolean(
              catData.physicalCharacteristics?.furColor || 
              catData.physicalCharacteristics?.furLength
            ),
            behavioral: Boolean(
              catData.behavioralCharacteristics?.personality || 
              catData.behavioralCharacteristics?.activityLevel
            ),
            medical: Boolean(
              catData.petVaccines?.length || 
              catData.petComorbidities
            ),
          };
          
          setCompletedSegments(completed);
          calculateProgress(catData, completed);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching cat data:', error);
          toast.error('Erro ao carregar dados do gato');
          setIsLoading(false);
        }
      };

      fetchCatData();
    }
  }, [id]);

  // Calculate form completion progress
  const calculateProgress = (data: Partial<Animal> = formData, segments = completedSegments) => {
    // Count filled fields (simplified approach)
    let filledFields = 0;
    let totalFields = 0;

    // Basic info fields
    const basicFields = ['petName', 'petGender', 'petPicture', 'petBirth'];
    basicFields.forEach(field => {
      totalFields++;
      if (data[field as keyof typeof data]) filledFields++;
    });

    // Physical characteristics
    if (data.physicalCharacteristics) {
      const physicalFields = ['furColor', 'furLength', 'eyeColor', 'size', 'weight'];
      physicalFields.forEach(field => {
        totalFields++;
        if (data.physicalCharacteristics?.[field as keyof typeof data.physicalCharacteristics]) 
          filledFields++;
      });
    }

    // Behavioral characteristics
    if (data.behavioralCharacteristics) {
      const behavioralFields = ['personality', 'activityLevel', 'socialBehavior', 'meow'];
      behavioralFields.forEach(field => {
        totalFields++;
        if (data.behavioralCharacteristics?.[field as keyof typeof data.behavioralCharacteristics]) 
          filledFields++;
      });
    }

    // Medical info
    totalFields += 2; // Vaccines and comorbidities
    if (data.petVaccines?.length) filledFields++;
    if (data.petComorbidities) filledFields++;

    // Update progress
    const calculatedProgress = Math.round((filledFields / totalFields) * 100);
    setProgress(calculatedProgress);
  };

  // Handle form data changes
  const handleFormDataChange = (newData: Partial<Animal>, segment: SegmentType) => {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);
    
    // Mark segment as completed (simplified logic - in a real app, validation would be more thorough)
    const isCompleted = 
      segment === 'basic' ? Boolean(updatedData.petName && updatedData.petGender) :
      segment === 'physical' ? Boolean(updatedData.physicalCharacteristics?.furColor) :
      segment === 'behavioral' ? Boolean(updatedData.behavioralCharacteristics?.personality) :
      Boolean(updatedData.petVaccines?.length || updatedData.petComorbidities);
    
    const updatedSegments = { ...completedSegments, [segment]: isCompleted };
    setCompletedSegments(updatedSegments);
    
    // Recalculate progress
    calculateProgress(updatedData, updatedSegments);
  };

  // Save form data
  const saveFormData = async (andContinue: boolean = false) => {
    try {
      setIsLoading(true);
      
      // For the first segment in CREATE mode, we use POST
      if (activeSegment === 'basic' && !isEditing) {
        const formDataToSubmit = new FormData();
        
        // Add basic text fields
        if (formData.petName) formDataToSubmit.append('petName', formData.petName);
        if (formData.petGender) formDataToSubmit.append('petGender', formData.petGender);
        if (formData.petObs) formDataToSubmit.append('petObs', formData.petObs);
        
        // Add company ID
        if (formData.company) {
          formDataToSubmit.append('company', formData.company);
        } else {
          const token = Cookies.get('token');
          if (token) {
            try {
              const decoded = jwtDecode<JwtPayload>(token);
              if (decoded.company) {
                formDataToSubmit.append('company', decoded.company);
              } else {
                toast.error('ID da empresa não encontrado');
                setIsLoading(false);
                return;
              }
            } catch (error) {
              console.error('Error decoding token:', error);
              toast.error('Erro ao obter ID da empresa');
              setIsLoading(false);
              return;
            }
          } else {
            toast.error('Token não encontrado');
            setIsLoading(false);
            return;
          }
        }
        
        // Add petStatus fields
        formDataToSubmit.append('petStatus.petCurrentStatus', '0');  // Default to healthy
        formDataToSubmit.append('petStatus.petOccurrencesQuantity', '0');
        
        // Add petBirth (formatted date)
        if (formData.petBirth) {
          const birthDate = new Date(formData.petBirth);
          formDataToSubmit.append('petBirth', birthDate.toISOString().split('T')[0]);
        }
        
        // Handle file upload for petPicture
        const pictureInput = document.getElementById('pet-picture') as HTMLInputElement;
        if (pictureInput?.files?.length) {
          formDataToSubmit.append('petPicture', pictureInput.files[0]);
        }
        
        // Send the POST request
        const response = await AnimalService.create(formDataToSubmit);
        
        if (response.ok && response._id) {
          toast.success('Gato cadastrado com sucesso!');
          
          // Update our state to edit mode now
          setIsEditing(true);
          
          // Update the URL to reflect edit mode
          navigate(`/cats/edit/${response._id}`, { replace: true });
          
          // Also update our component state
          setFormData(prev => ({ ...prev, _id: response._id }));
          
          if (andContinue) {
            setActiveSegment('physical');
          } else {
            navigate('/cats');
          }
        } else {
          toast.error(response.message || 'Erro ao cadastrar gato');
        }
      } 
      // For all other segments OR in EDIT mode, we use PATCH
      else if (id || formData._id) {
        const catId = (id || formData._id) as string;
        let patchData: Partial<Animal> = {};
        
        // Only include the relevant data for this segment
        if (activeSegment === 'basic') {
          patchData = {
            petName: formData.petName,
            petGender: formData.petGender,
            petObs: formData.petObs
          };
          
          // Handle file upload for petPicture separately if needed
          const pictureInput = document.getElementById('pet-picture') as HTMLInputElement;
          if (pictureInput?.files?.length) {
            // In a real app, you'd upload the file and update the URL
            // Here we're just updating the formData state for simplicity
            patchData.petPicture = URL.createObjectURL(pictureInput.files[0]);
          }
          
          if (formData.petBirth) {
            patchData.petBirth = formData.petBirth;
          }
        } 
        else if (activeSegment === 'physical') {
          patchData = {
            petCharacteristics: formData.petCharacteristics,
            physicalCharacteristics: formData.physicalCharacteristics
          };
        } 
        else if (activeSegment === 'behavioral') {
          patchData = {
            behavioralCharacteristics: formData.behavioralCharacteristics
          };
        } 
        else if (activeSegment === 'medical') {
          patchData = {
            petComorbidities: formData.petComorbidities
          };
          
          // Handle vaccine upload separately if needed
          const vaccineInput = document.getElementById('pet-vaccine') as HTMLInputElement;
          if (vaccineInput?.files?.length) {
            // In a real app, you'd upload the file and get back a URL to add to petVaccines
            // Here we're just updating the formData state for simplicity
            patchData.petVaccines = [URL.createObjectURL(vaccineInput.files[0])];
          }
        }
        
        // Send the PATCH request
        const response = await AnimalService.update(catId, patchData);
        
        if (response.ok) {
          toast.success('Gato atualizado com sucesso!');
          
          if (andContinue) {
            // Move to next segment
            if (activeSegment === 'basic') setActiveSegment('physical');
            else if (activeSegment === 'physical') setActiveSegment('behavioral');
            else if (activeSegment === 'behavioral') setActiveSegment('medical');
            else navigate('/cats');
          } else {
            // Return to cats view
            navigate('/cats');
          }
        } else {
          toast.error(response.message || 'Erro ao atualizar gato');
        }
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error saving cat data:', error);
      toast.error('Erro ao salvar dados do gato');
      setIsLoading(false);
    }
  };

  // Handle segment change
  const handleSegmentChange = (segment: SegmentType) => {
    // Only allow changing to other segments after basic info has been saved
    if (segment !== 'basic' && !isEditing) {
      toast.warn('Salve as informações básicas primeiro');
      return;
    }
    
    setActiveSegment(segment);
  };

  if (isLoading && !formData.petName) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">{isEditing ? 'Editar gato' : 'Adicionar gato'}</h1>
        <Button 
          variant="outline" 
          className="text-black"
          size="icon"
          onClick={() => navigate('/cats')}
        >
          <HelpCircle size={16} />
        </Button>
      </div>

      <div className="mb-6">
        <p className="text-white mb-2">Progresso:</p>
        <ProgressBar progress={progress} />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Segment Navigation Menu */}
        <div className="w-full md:w-64 bg-gray-900 rounded-md overflow-hidden">
          <div className="p-4 bg-gray-800">
            <h2 className="text-white font-semibold">SEGMENTOS:</h2>
          </div>
          
          <button
            className={`w-full text-left p-4 transition-colors ${
              activeSegment === 'basic' 
                ? 'bg-[#475746] text-white font-semibold' 
                : 'text-white hover:bg-gray-800'
            } ${
              completedSegments.basic 
                ? 'text-green-500' 
                : 'font-italic'
            }`}
            onClick={() => handleSegmentChange('basic')}
          >
            Dados básicos e foto de perfil
          </button>
          
          <button
            className={`w-full text-left p-4 transition-colors ${
              activeSegment === 'physical' 
                ? 'bg-[#475746] text-white font-semibold' 
                : 'text-white hover:bg-gray-800'
            } ${
              completedSegments.physical 
                ? 'text-green-500' 
                : 'font-italic'
            } ${
              !isEditing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handleSegmentChange('physical')}
            disabled={!isEditing}
          >
            Características físicas
          </button>
          
          <button
            className={`w-full text-left p-4 transition-colors ${
              activeSegment === 'behavioral' 
                ? 'bg-[#475746] text-white font-semibold' 
                : 'text-white hover:bg-gray-800'
            } ${
              completedSegments.behavioral 
                ? 'text-green-500' 
                : 'font-italic'
            } ${
              !isEditing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handleSegmentChange('behavioral')}
            disabled={!isEditing}
          >
            Comportamento social
          </button>
          
          <button
            className={`w-full text-left p-4 transition-colors ${
              activeSegment === 'medical' 
                ? 'bg-[#475746] text-white font-semibold' 
                : 'text-white hover:bg-gray-800'
            } ${
              completedSegments.medical 
                ? 'text-green-500' 
                : 'font-italic'
            } ${
              !isEditing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handleSegmentChange('medical')}
            disabled={!isEditing}
          >
            Carteira de vacinação e comorbidades
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1">
          {activeSegment === 'basic' && (
            <SegmentOne
              formData={formData}
              onChange={(data) => handleFormDataChange(data, 'basic')}
              onSaveAndFinalize={() => saveFormData(false)}
              onSaveAndContinue={() => saveFormData(true)}
              isLoading={isLoading}
            />
          )}
          
          {activeSegment === 'physical' && (
            <SegmentTwo
              formData={formData}
              onChange={(data) => handleFormDataChange(data, 'physical')}
              onSaveAndFinalize={() => saveFormData(false)}
              onSaveAndContinue={() => saveFormData(true)}
              isLoading={isLoading}
            />
          )}
          
          {activeSegment === 'behavioral' && (
            <SegmentThree
              formData={formData}
              onChange={(data) => handleFormDataChange(data, 'behavioral')}
              onSaveAndFinalize={() => saveFormData(false)}
              onSaveAndContinue={() => saveFormData(true)}
              isLoading={isLoading}
            />
          )}
          
          {activeSegment === 'medical' && (
            <SegmentFour
              formData={formData}
              onChange={(data) => handleFormDataChange(data, 'medical')}
              onSaveAndFinalize={() => saveFormData(false)}
              onSaveAndContinue={() => saveFormData(true)}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CatForm;