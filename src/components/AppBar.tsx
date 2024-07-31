import { Smartphone, Tablet, Monitor, Sun, Moon } from 'lucide-react';
import type { FC, Dispatch, SetStateAction } from 'react';

type AppBarProps={
  selectedDevice: string,
    setSelectedDevice: Dispatch<SetStateAction<string>>
}
const AppBar: FC<AppBarProps> = ({
  selectedDevice,
  setSelectedDevice
}) => {

  const handleDeviceView=(device: string)=>{
    setSelectedDevice(device);
  };

  return (
    <div className="flex justify-between flex-wrap py-1 px-4 border rounded-lg mt-12">
        <div className="flex items-center text-black">
            <span className="text-base">Device:</span>
            <div className="flex gap-x-2 p-1 rounded-lg bg-gray-50 ms-2">
                <button onClick={()=>handleDeviceView('mobile')} className={`flex justify-center items-center px-2 py-1 h-10 w-12 rounded transition-all duration-700  ${selectedDevice==='mobile' ? ` bg-blue-600 text-white`:``}`} title='phone view button'>
                  <Smartphone />
                </button>
                <button onClick={()=>handleDeviceView('tablet')} className={`flex justify-center items-center px-2 py-1 h-10 w-12 rounded  transition-all duration-700  ${selectedDevice==='tablet' ? ` bg-blue-600 text-white`:``}`} title='tablet view button'>
                  <Tablet />
                </button>
                <button onClick={()=>handleDeviceView('desktop')} className={`flex justify-center items-center px-2 py-1 h-10 w-12 rounded  transition-all duration-700 ${selectedDevice==='desktop' ? ` bg-blue-600 text-white`:``}`} title='desktop view button'>
                  <Monitor />
                </button>
            </div>
        </div>
        
        <div className="flex items-center text-black">
            <span className="text-base">Theme:</span>
            <div className="flex gap-x-2 p-1.5 rounded-lg bg-gray-50 ms-2">
                <button className="flex justify-center items-center px-2 py-1 h-10 w-12 hover:bg-gray-200 rounded" title='light theme button'>
                  <Sun />
                </button>
                <button className="flex justify-center items-center px-2 py-1 h-10 w-12 hover:bg-gray-200 rounded" title='dark theme button'>
                  <Moon />
                </button>
            </div>
        </div>
    </div>
  )
}

export default AppBar