import { map } from 'lodash';
import React, { useState } from 'react';

function Todo({ planList }) {
  const [todoList, setTodoList] = useState([{}]);
  const [modal, setModal] = React.useState(false);
  const [belongTo, setBelong] = React.useState('');

  const toggle = () => {
    const popup = document.getElementById('popup');
    popup.classList.toggle('hidden');
    setModal(!modal);
    const planListModal = document.getElementById('planListModal');
    planListModal.classList.remove('hidden');
  };

  const deleteTodo = (index) => {
    setTodoList(todoList.filter((item) => item.id !== index));
  };

  const addExpenses = () => {
    const popup = document.getElementById('popup');

    let input = document.getElementById('input').value;
    let status = document.getElementById('input').value;

    setTodoList([
      ...todoList,
      {
        name: input,
        status: status,
        id: todoList.length !== 0 ? todoList[todoList.length - 1].id + 1 : 1,
        belongTo: belongTo,
      },
    ]);
    popup.classList.toggle('hidden');
    setModal(!modal);
    console.log({
      name: input,
      status: status,
      id: todoList[todoList.length - 1].id + 1,
      belongTo: belongTo,
    });
  };

  const closePopup = () => {
    const popup = document.getElementById('planListModal');
    popup.classList.toggle('hidden');
  };

  return (
    <div className="w-11/12 h-screen bg-[#fff]">
      <div
        className="w-full h-full bg-[#000] bg-opacity-40 flex justify-center items-center flex-col hidden"
        id="popup"
      >
        <div className="w-8/12 h-fit text-xl font-semibold flex justify-between items-center px-7 flex-col text-[#fff]">
          <div className="flex justify-between items-center w-full bg-[#FFBA00] py-5 px-4">
            <div className="text-2xl">Cập nhật tình hình</div>
            <button onClick={toggle}>dong</button>
          </div>
          <div className="bg-[#fff] text-[#32A071] w-full py-4 px-4">
            <div className="flex">
              <div className="w-10/12">
                {' '}
                <div>Chọn địa điểm trong kế hoạch:</div>
                <div id="planListModal">
                  {planList.map((plan) => (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setBelong(plan.place);
                        closePopup();
                      }}
                    >
                      <div className="flex">
                        <img className="h-40" src={plan.image} alt="" />
                        <div className="text-2xl ml-4">{plan.place}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xl">Việc bạn muốn làm là gì?</div>
                <div>
                  <input
                    id="input"
                    type="text"
                    className="h-12 p-3 w-11/12 mt-8 mb-6 border border-[#FFBA00]"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-start items-center">
              <input type="checkbox" name="done" id="done" className="mr-5" />
              <div>Đã hoàn thành</div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full h-20 bg-[#FFBA00] px-4">
            <div className="cursor-pointer" onClick={toggle}>
              Dong
            </div>
            <div className="cursor-pointer" onClick={addExpenses}>
              Thêm lịch trình
            </div>
          </div>
        </div>
      </div>
      <div className="h-32 w-full px-10 text-2xl font-semibold flex justify-between items-center mt-10 text-[#32A071]">
        <div className="text-3xl">Lịch Trình {todoList.length}</div>
        <div className="px-4 h-fit py-4 border border-[#32A071] rounded-2xl flex justify-center items-center cursor-pointer">
          Thêm tất cả lịch trình
        </div>
        <div
          className="px-4 h-fit py-4 border border-[#32A071] rounded-2xl flex justify-center items-center cursor-pointer"
          onClick={toggle}
        >
          Thêm lịch trình
        </div>
      </div>

      {todoList.length === 0 ? (
        <div className="flex h-1/3 justify-center items-center w-full"></div>
      ) : (
        <div className="flex flex-col justify-start items-center mt-10">
          {todoList.map((item, index) => (
            <div className="flex h-20 w-11/12 mt-8 border rounded-2xl overflow-hidden" key={index}>
              <div className="w-3/4 flex flex-col justify-center items-center text-3xl font-bold text-[#000]">
                <div>
                  {item.name} ở {item.belongTo}
                </div>
              </div>
              <div className="w-1/4  flex flex-col justify-evenly">
                <div className=" font-semibold text-[#000] flex justify-between">
                  <div>{item.cost}</div>
                  <div className="mr-4">
                    <button className="mx-2">modify</button>
                    <button className="mx-2" onClick={() => deleteTodo(item.id)}>
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

export default Todo;
