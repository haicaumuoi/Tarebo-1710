import React, { useEffect, useMemo } from 'react';
import { Autocomplete, GoogleMap, Marker } from '@react-google-maps/api';
import triplist from '~/assets/images/triplist.png';
import { useNavigate } from 'react-router-dom';
import { API_PATH, ROUTES_PATH } from '~/constants';
import axiosInstance from '~/app/api';
import { toast } from 'react-toastify';

function Index() {
  const [triplists, setTriplist] = React.useState([
    {
      places: ['abc', 'xyz'],
      name: 'Nghi duong',
      id: 1,
    },
    {
      places: ['abc', 'xyz'],
      name: 'Nghi duong',
      id: 2,
    },
    {
      places: ['abc', 'xyz'],
      name: 'Nghi duong',
      id: 3,
    },
  ]);
  const [modal, setModal] = React.useState(false);
  const [map, setMap] = React.useState(/** @type google.map.Map  */ (null));

  const center = useMemo(
    () => ({
      lat: -3.745,
      lng: -38.523,
    }),
    []
  );

  const deleteTrip = (index) => {
    setTriplist(triplists.filter((item) => item.id !== index));
  };

  const toggle = () => {
    const popup = document.getElementById('popup');
    popup.classList.toggle('hidden');
    setModal(!modal);
  };

  const addTrip = () => {
    const popup = document.getElementById('popup');

    let inputValue = document.getElementById('value').value;

    setTriplist([
      ...triplists,
      {
        places: [],
        name: inputValue,
        id: triplists[triplists?.length - 1]?.id + 1,
      },
    ]);
    popup.classList.toggle('hidden');
    setModal(!modal);
  };

  const navigate = useNavigate();

  const getTrips = async (data) => {
    try {
      const res = await axiosInstance.get(API_PATH.triplist?.getList);
      setTriplist(res?.listTrip);
      console.log(res?.listTrip);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const postTrips = async (data) => {
    try {
      const { response, msg } = await axiosInstance.post(API_PATH.triplist.createTrip, {
        ...data,
      });
      console.log(response);
      if (+response === 200) {
        return;
      } else {
        toast.error(msg);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getTrips();
  }, []);

  const getTripsData = () => {
    console.log(triplists);
  };

  return (
    <div className="flex">
      <div className="w-5/12 h-screen bg-[#67AB93] pt-28 overflow-y-scroll relative">
        <div
          className="w-full h-full bg-[#000] bg-opacity-40 flex justify-center items-center flex-col hidden"
          id="popup"
        >
          <div className="w-8/12 h-fit text-xl font-semibold flex justify-between items-center px-7 flex-col text-[#fff]">
            <div className="flex justify-between items-center w-full bg-[#FFBA00] py-5 px-4">
              <div className="text-2xl">Lập kế hoạch</div>
              <button onClick={toggle}>dong</button>
            </div>
            <div className="bg-[#fff] text-[#32A071] w-full py-4 px-4">
              <div className="text-xl">Tên chuyến đi</div>
              <div>
                <input
                  id="value"
                  type="text"
                  className="h-12 p-3 w-7/12 mt-8 mb-6 border border-[#FFBA00]"
                />
              </div>
              <div className="flex">
                <button>chia se</button>
                <div className="ml-6">
                  <div>chia se</div>
                  <div>chia se voi moi nguoi</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-full h-20 bg-[#FFBA00] px-4">
              <div className="cursor-pointer" onClick={toggle}>
                Dong
              </div>
              <div className="cursor-pointer" onClick={addTrip}>
                Lap ke hoach
              </div>
            </div>
          </div>
        </div>
        <div className="text-[#fff] text-4xl flex w-full justify-between items-center h-fit py-3 px-16 font-semibold mt-20">
          <div onClick={getTripsData}>Chuyến đi của bạn ( {triplists?.length} )</div>
          <div
            className="border-[#fff] border-4 rounded-2xl px-16 py-2 cursor-pointer"
            onClick={toggle}
          >
            Đi nào!
          </div>
        </div>
        {triplists?.length === 0 ? (
          <div className="flex justify-center items-center flex-col">
            <div>
              <img src={triplist} alt="images" />
            </div>
            <div className="text-[#fff] text-4xl font-semibold mt-12 flex justify-center">
              Bạn chưa có chuyến đi nào trong danh sách
            </div>
            <div
              className="border-[#fff] border-4 rounded-2xl px-16 py-2 cursor-pointer text-[#fff] text-4xl font-semibold mt-12"
              onClick={toggle}
            >
              Tạo mới
            </div>
            <div className="text-[#fff] text-4xl font-semibold mt-12 w-1/2 flex justify-center">
              Khám Phá Các Chuyến Đi
            </div>
            <div className="text-[#fff] font-semibold mt-10 w-1/2 text-center">
              Bạn chưa biết đi đâu? Bạn cần tham khảo từ những người khác? Hãy xem qua các chuyến đi
              nổi bật từ mọi người nhé! Bạn chưa có chuyến đi nào trong danh sách
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-start items-center mt-10">
            {triplists?.map((item, index) => (
              <div
                className="flex h-40 w-11/12 mt-8 border rounded-2xl overflow-hidden"
                key={index}
              >
                <div className="w-1/4 h-full bg-[#FFBA00] flex flex-col justify-center items-center text-[5.5rem] font-bold text-[#fff]">
                  <div>{item.__v}</div>

                  <div className="text-lg -mt-6">Địa điểm</div>
                </div>
                <div className="w-3/4 h-full bg-[#fff] flex flex-col justify-evenly">
                  <div className="pl-10 font-semibold text-[#32A071] flex justify-between">
                    <div>{item.title}</div>
                    <div className="mr-4">
                      <button className="mx-2">modify</button>
                      <button className="mx-2" onClick={() => deleteTrip(item.id)}>
                        delete
                      </button>
                    </div>
                  </div>
                  <div className="pl-10 font-semibold bg-[#FFE2948F] bg-opacity-60 text-[#32A071]">
                    <button
                      onClick={() =>
                        navigate(ROUTES_PATH.user.tripListDetail.replace(':id', item._id))
                      }
                    >
                      Chi tiet
                    </button>
                  </div>
                  <div className="pl-10">
                    <button>Rieng tu</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
