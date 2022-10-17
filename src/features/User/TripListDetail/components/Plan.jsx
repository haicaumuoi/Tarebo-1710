import { Autocomplete } from '@react-google-maps/api';
import React from 'react';
import { useDispatch } from 'react-redux';

function Plan({ planList, setplanList, setMap, map }) {
  const [modal, setModal] = React.useState(false);
  const dispatch = useDispatch();

  const toggle = () => {
    const popup = document.getElementById('popup');
    popup.classList.toggle('hidden');
    setModal(!modal);
  };

  const deletePlan = (index) => {
    setplanList(planList.filter((item) => item.id !== index));
  };

  const addExpenses = () => {
    const popup = document.getElementById('popup');

    console.log(img[0]);
    setplanList([
      ...planList,
      {
        place: address,
        image: img[0],
        id: planList[planList.length - 1].id + 1,
      },
    ]);
    popup.classList.toggle('hidden');
    console.log(address);
    setModal(!modal);
  };

  const [autocompleted, setAutocompleted] = React.useState('');
  const [img, setImg] = React.useState([]);
  const [address, setAddress] = React.useState('');

  const onPlacedChange = async () => {
    if (autocompleted !== null) {
      const place = autocompleted.getPlace();
      console.log(place);
      const lng = place.geometry.location.lng();
      const lat = place.geometry.location.lat();
      setMap((map) => {
        map.setCenter({ lat, lng });
        return map;
      });
      const imgList = place.photos.map((photo) => photo.getUrl());
      setImg(imgList);
      setAddress(place.formatted_address);
      console.log(place);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onLoad = (autocomplete) => {
    setAutocompleted(autocomplete);
  };

  return (
    <div className="w-11/12 h-screen bg-[#fff]">
      <div
        className="w-full h-full bg-[#000] bg-opacity-40 flex justify-center items-center flex-col hidden"
        id="popup"
      >
        <div className="w-8/12 h-fit text-xl font-semibold flex justify-between items-center px-7 flex-col text-[#fff]">
          <div className="flex justify-between items-center w-full bg-[#FFBA00] py-5 px-4">
            <div className="text-2xl">Thêm địa điểm</div>
            <button onClick={toggle}>dong</button>
          </div>
          <div className="bg-[#fff] text-[#32A071] w-full py-4 px-4">
            <div className="flex">
              <div className="w-10/12">
                {' '}
                <div className="text-xl">Tìm kiếm địa điểm</div>
                <div>
                  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlacedChange} id="data">
                    <input
                      id="input"
                      type="text"
                      className="h-12 p-3 w-11/12 mt-8 mb-6 border border-[#FFBA00]"
                    />
                  </Autocomplete>
                  <div className="flex ">
                    <img className="h-40" src={img[0]} alt="" />
                    <div className="text-2xl ml-4">{address}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full h-20 bg-[#FFBA00] px-4">
            <div className="cursor-pointer" onClick={toggle}>
              Dong
            </div>
            <div className="cursor-pointer" onClick={addExpenses}>
              Thêm kế hoạch
            </div>
          </div>
        </div>
      </div>
      <div className="h-32 w-full px-10 text-2xl font-semibold flex justify-between items-center mt-10 text-[#32A071]">
        <div className="text-3xl">Kế Hoạch ({planList.length})</div>
        <div className="px-4 h-fit py-4 border border-[#32A071] rounded-2xl flex justify-center items-center cursor-pointer">
          Thêm tất cả kế hoạch
        </div>
        <div
          className="px-4 h-fit py-4 border border-[#32A071] rounded-2xl flex justify-center items-center cursor-pointer"
          onClick={toggle}
        >
          Thêm kế hoạch
        </div>
      </div>

      {planList.length === 0 ? (
        <div className="flex h-1/3 justify-center items-center w-full"></div>
      ) : (
        <div className="flex flex-col justify-start items-center mt-10">
          {planList.map((item, index) => (
            <div className="flex h-40 w-11/12 mt-8 border rounded-2xl overflow-hidden" key={index}>
              <div className="w-1/4 flex flex-col justify-center items-center text-3xl font-bold text-[#000]">
                <img src={item.image} alt="" />
              </div>
              <div className="w-3/4  flex flex-col justify-evenly">
                <div className=" font-semibold text-[#000] flex justify-between px-4">
                  <div className="text-3xl">{item.place}</div>
                  <div className="mr-4">
                    <button className="mx-2">modify</button>
                    <button className="mx-2" onClick={() => deletePlan(item.id)}>
                      delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Plan;
