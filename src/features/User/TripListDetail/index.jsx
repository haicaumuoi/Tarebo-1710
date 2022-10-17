import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from '~/constants';
import Expense from './components/Expense';
import Plan from './components/Plan';
import Todo from './components/Todo';

function Index() {
  const navigate = useNavigate();
  const [type, setType] = useState('plan');
  const [planList, setplanList] = useState([
    {
      place: 'abc',
      image: 'https://picsum.photos/200/300',
      id: 1,
    },
    {
      place: 'abc',
      image: 'https://picsum.photos/200/300',
      id: 2,
    },
    {
      place: 'abc',
      image: 'https://picsum.photos/200/300',
      id: 3,
    },
  ]);

  const showContent = () => {
    switch (type) {
      case 'plan':
        return <Plan planList={planList} setplanList={setplanList} setMap={setMap} map={map} />;
      case 'todos':
        return <Todo planList={planList} setplanList={setplanList} />;
      default:
        return <Expense planList={planList} setplanList={setplanList} />;
    }
  };

  const [map, setMap] = React.useState(/** @type google.map.Map  */ (null));

  const center = useMemo(
    () => ({
      lat: -3.745,
      lng: -38.523,
    }),
    []
  );

  return (
    <div className="flex">
      <div className="w-5/12 h-screen bg-[#67AB93] pt-28 overflow-y-scroll ">
        <div className="flex justify-between items-center w-full px-10 h-20 text-[#fff] mt-10">
          <div className="flex text-2xl font-semibold">
            <div className="cursor-pointer" onClick={() => navigate(ROUTES_PATH.user.triplist)}>
              Back
            </div>{' '}
            {''}
            <div>Nghỉ dưỡng</div>
          </div>
          <div>modify</div>
        </div>

        <div className="flex flex-col justify-start items-center w-full">
          <div className="w-11/12  ">
            <div className="flex space-x-5">
              <div
                className="p-12 text-2xl font-semibold bg-[#fff] rounded-2xl -mb-5 text-[#32A071] cursor-pointer"
                onClick={() => setType('plan')}
              >
                Kế Hoạch
              </div>
              <div
                className="p-12 text-2xl font-semibold bg-[#fff] rounded-2xl -mb-5 text-[#32A071] cursor-pointer"
                onClick={() => setType('todos')}
              >
                Lịch Trình
              </div>
              <div
                className="p-12 text-2xl font-semibold bg-[#fff] rounded-2xl -mb-5 text-[#32A071] cursor-pointer"
                onClick={() => setType('expense')}
              >
                Chi Phí
              </div>
            </div>
          </div>
          {showContent()}
        </div>
      </div>
      <div className="w-7/12 h-screen">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          zoom={18}
          center={center}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>
    </div>
  );
}

export default Index;
