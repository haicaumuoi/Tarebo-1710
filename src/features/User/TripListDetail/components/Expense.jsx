import React, { useState } from 'react';
import expesesImg from '~/assets/images/expenseImg.jpg';
import food from '~/assets/logo/food.jpg';
import fuel from '~/assets/logo/fuel.jpg';
import hotel from '~/assets/logo/hotel.jpg';
import fun from '~/assets/logo/fun.jpg';

function Expense({ planList }) {
  const [expenseList, setExpenseList] = useState([]);
  const [modal, setModal] = React.useState(false);
  const [belongTo, setBelong] = React.useState('');

  const toggle = () => {
    const popup = document.getElementById('popup');
    popup.classList.toggle('hidden');
    setModal(!modal);
    const planListModal = document.getElementById('planListModal');
    planListModal.classList.remove('hidden');
  };

  const deleteExpense = (index) => {
    setExpenseList(expenseList.filter((item) => item.id !== index));
  };

  const [typeOfExpense, setTypeOfExpense] = useState('Phòng Ở');

  const addExpenses = () => {
    const popup = document.getElementById('popup');

    let nameValue = document.getElementById('nameValue').value;
    let costValue = document.getElementById('costValue').value;
    let typeValue = document.getElementsByName('cost').value;

    setExpenseList([
      ...expenseList,
      {
        desc: nameValue,
        cost: costValue,
        typeOfExpense: typeValue,
        id: expenseList.length !== 0 ? expenseList[expenseList.length - 1].id + 1 : 1,
        belongTo: belongTo,
      },
    ]);
    console.log(typeValue);
    popup.classList.toggle('hidden');
    setModal(!modal);
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
            <div className="text-2xl">Cập nhật chi phí</div>
            <button onClick={toggle}>dong</button>
          </div>
          <div className="bg-[#fff] text-[#32A071] w-full py-4 px-4">
            <div className="flex">
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
            </div>
            <div className="w-8/12">
              <div className="text-xl">Mô tả chi phí</div>
              <div>
                <input
                  id="nameValue"
                  type="text"
                  className="h-12 p-3 w-11/12 mt-8 mb-6 border border-[#FFBA00]"
                />
              </div>
              <div className="w-4/12">
                <div className="text-xl">Định giá</div>
                <div>
                  <input
                    id="costValue"
                    type="text"
                    className="h-12 p-3 w-full  mt-8 mb-6 border border-[#FFBA00]"
                  />
                </div>
              </div>
            </div>
            <div>Loại Chi Phí</div>
            <div className="flex justify-evenly items-center h-60">
              <div className="flex flex-col items-center">
                <img src={food} alt="" />
                <div>Ăn Uống</div>
                <input type="radio" value="food" name="cost" />
              </div>
              <div className="flex flex-col items-center">
                <img src={hotel} alt="" />
                <div>Khách sạn</div>
                <input type="radio" value="hotel" name="cost" />
              </div>
              <div className="flex flex-col items-center">
                <img src={fun} alt="" />
                <div>Vui Chơi</div>
                <input type="radio" value="fun" name="cost" />
              </div>
              <div className="flex flex-col items-center">
                <img src={fuel} alt="" />
                <div>Nhiên liệu</div>
                <input type="radio" value="fuel" name="cost" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full h-20 bg-[#FFBA00] px-4">
            <div className="cursor-pointer" onClick={toggle}>
              Dong
            </div>
            <div className="cursor-pointer" onClick={addExpenses}>
              Thêm chi phí
            </div>
          </div>
        </div>
      </div>
      <div className="h-32 w-full px-10 text-2xl font-semibold flex justify-between items-center mt-10 text-[#32A071]">
        <div className="text-3xl">Chi Phí {expenseList.length}</div>
        <div className="px-4 h-fit py-4 border border-[#32A071] rounded-2xl flex justify-center items-center cursor-pointer">
          Thêm tất cả chi phí
        </div>
        <div
          className="px-4 h-fit py-4 border border-[#32A071] rounded-2xl flex justify-center items-center cursor-pointer"
          onClick={toggle}
        >
          Thêm chi phí
        </div>
      </div>

      {expenseList.length === 0 ? (
        <div className="flex h-1/3 justify-center items-center w-full">
          <img src={expesesImg} alt="expenses" />
        </div>
      ) : (
        <div className="flex flex-col justify-start items-center mt-10">
          {expenseList.map((item, index) => (
            <div className="flex h-20 w-11/12 mt-8 border rounded-2xl overflow-hidden" key={index}>
              <div className="w-1/4 bg-[#FFBA00] flex flex-col justify-center items-center text-3xl font-bold text-[#000]">
                <div>{item.typeOfExpense}</div>
              </div>
              <div className="w-3/4 bg-[#FFBA00] flex flex-col justify-evenly">
                <div className=" font-semibold text-[#000] flex justify-between">
                  <div>{item.cost}</div>
                  <div className="mr-4">
                    <button className="mx-2">modify</button>
                    <button className="mx-2" onClick={() => deleteExpense(item.id)}>
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

export default Expense;
