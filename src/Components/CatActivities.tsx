import { useState, useEffect } from 'react';
import { Button } from '@/Components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/Components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

interface CatActivity {
  id: string;
  activityType: string;
  location: string;
  startDate: string;
  startTime: string;
  finishDate: string;
  finishTime: string;
  duration: string;
}

interface CatActivitiesProps {
  catId: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const CatActivities = ({ catId, isExpanded, onToggleExpand }: CatActivitiesProps) => {
  const [activities, setActivities] = useState<CatActivity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<CatActivity[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{start: string; end: string}>({
    start: '',
    end: ''
  });

  useEffect(() => {
    // Mock fetch activities data
    const fetchActivitiesData = async () => {
      // This would be an API call in a real application
      const mockActivities: CatActivity[] = [
        {
          id: '1',
          activityType: 'Alimentação',
          location: 'Área de alimentação',
          startDate: '01/05/2025',
          startTime: '08:30',
          finishDate: '01/05/2025',
          finishTime: '08:45',
          duration: '15 min'
        },
        {
          id: '2',
          activityType: 'Soneca',
          location: 'Área de descanso',
          startDate: '01/05/2025',
          startTime: '09:15',
          finishDate: '01/05/2025',
          finishTime: '11:45',
          duration: '2h 30min'
        },
        {
          id: '3',
          activityType: 'Banheiro',
          location: 'Caixa de areia',
          startDate: '01/05/2025',
          startTime: '12:10',
          finishDate: '01/05/2025',
          finishTime: '12:15',
          duration: '5 min'
        },
        {
          id: '4',
          activityType: 'Socialização',
          location: 'Quintal dos fundos',
          startDate: '01/05/2025',
          startTime: '14:30',
          finishDate: '01/05/2025',
          finishTime: '15:45',
          duration: '1h 15min'
        },
        {
          id: '5',
          activityType: 'Alimentação',
          location: 'Área de alimentação',
          startDate: '01/05/2025',
          startTime: '18:00',
          finishDate: '01/05/2025',
          finishTime: '18:20',
          duration: '20 min'
        },
        {
          id: '6',
          activityType: 'Soneca',
          location: 'Área de descanso',
          startDate: '30/04/2025',
          startTime: '10:30',
          finishDate: '30/04/2025',
          finishTime: '14:15',
          duration: '3h 45min'
        },
        {
          id: '7',
          activityType: 'Alimentação',
          location: 'Área de alimentação',
          startDate: '30/04/2025',
          startTime: '07:45',
          finishDate: '30/04/2025',
          finishTime: '08:00',
          duration: '15 min'
        },
        {
          id: '8',
          activityType: 'Banheiro',
          location: 'Caixa de areia',
          startDate: '30/04/2025',
          startTime: '09:00',
          finishDate: '30/04/2025',
          finishTime: '09:05',
          duration: '5 min'
        }
      ];
      
      setActivities(mockActivities);
      setFilteredActivities(mockActivities);
    };

    fetchActivitiesData();
  }, [catId]);

  // Apply filters when they change
  useEffect(() => {
    let filtered = [...activities];

    // Apply activity type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(activity => activity.activityType === filterType);
    }

    // Apply date range filter
    if (dateRange.start) {
      filtered = filtered.filter(activity => new Date(activity.startDate.split('/').reverse().join('-')) >= new Date(dateRange.start));
    }
    
    if (dateRange.end) {
      filtered = filtered.filter(activity => new Date(activity.startDate.split('/').reverse().join('-')) <= new Date(dateRange.end));
    }

    setFilteredActivities(filtered);
  }, [activities, filterType, dateRange]);

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
  };

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    setDateRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  if (!isExpanded) {
    return (
      <div className="bg-gray-900 rounded-md overflow-hidden">
        <div 
          className="p-3 bg-[#475746] flex justify-between items-center cursor-pointer"
          onClick={onToggleExpand}
        >
          <h2 className="text-lg font-semibold text-white">Atividades</h2>
          <ChevronDown className="text-white" size={20} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-md overflow-hidden">
      <div 
        className="p-3 bg-[#475746] flex justify-between items-center cursor-pointer"
        onClick={onToggleExpand}
      >
        <h2 className="text-lg font-semibold text-white">Atividades</h2>
        <ChevronUp className="text-white" size={20} />
      </div>

      <div className="p-4 bg-[#324250]">
        {/* Filter controls */}
        <div className="flex flex-wrap gap-4 mb-4">
          {/* Activity type filter */}
          <div className="w-full md:w-1/4">
            <Select value={filterType} onValueChange={handleFilterTypeChange}>
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Tipo de atividade" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-600">
                <SelectItem value="all">Todas as atividades</SelectItem>
                <SelectItem value="Alimentação">Alimentação</SelectItem>
                <SelectItem value="Soneca">Soneca</SelectItem>
                <SelectItem value="Banheiro">Banheiro</SelectItem>
                <SelectItem value="Socialização">Socialização</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Date range picker */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="flex items-center">
              <input 
                type="date" 
                className="bg-gray-700 border-gray-600 text-white rounded-md p-2"
                value={dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
              />
              <span className="mx-2 text-white">até</span>
              <input 
                type="date" 
                className="bg-gray-700 border-gray-600 text-white rounded-md p-2"
                value={dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
              />
            </div>
            <Button 
              variant="ghost" 
              className="ml-2 text-white bg-[#6C1482] hover:bg-[#5a1069]"
              onClick={() => setDateRange({ start: '', end: '' })}
            >
              Limpar
            </Button>
          </div>
        </div>

        {/* Activities table */}
        <div className="rounded-md border border-gray-700 overflow-hidden">
          <Table>
            <TableHeader className="bg-[#375a3c]">
              <TableRow>
                <TableHead className="text-white w-40">Tipo</TableHead>
                <TableHead className="text-white w-40">Local</TableHead>
                <TableHead className="text-white w-32">Data de início</TableHead>
                <TableHead className="text-white w-32">Hora de início</TableHead>
                <TableHead className="text-white w-32">Data de término</TableHead>
                <TableHead className="text-white w-32">Hora de término</TableHead>
                <TableHead className="text-white w-24">Duração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-[#324250]">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <TableRow key={activity.id} className="border-gray-600 hover:bg-[#3c4e5a]">
                    <TableCell className="text-white">{activity.activityType}</TableCell>
                    <TableCell className="text-white">{activity.location}</TableCell>
                    <TableCell className="text-white">{activity.startDate}</TableCell>
                    <TableCell className="text-white">{activity.startTime}</TableCell>
                    <TableCell className="text-white">{activity.finishDate}</TableCell>
                    <TableCell className="text-white">{activity.finishTime}</TableCell>
                    <TableCell className="text-white">{activity.duration}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-400">
                    Nenhuma atividade encontrada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CatActivities;