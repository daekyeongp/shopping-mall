import React from 'react';
import {Table} from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';


function Cart(props) {

  let state = useSelector((state)=>state);
  let dispatch = useDispatch();

  return (
    <div>
      <Table responsive>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>
        <tbody>
          {
            state.reducer.map((a, i) =>{
              return (
                <tr key={i}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.quan}</td>
                  <td>
                    <button onClick={()=>{ dispatch({ type: '수량증가', payload: a.id }) }}>+</button>
                    <button onClick={()=>{ dispatch({ type: '수량감소', payload: a.id }) }}>-</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
      {
        state.reducer2 === true
        ? (<div className="my-alert">
          <p>지금 구매시 20% 파격 할인!</p>
          <button onClick={()=>{ dispatch({ type: 'alert닫기'})}}>닫기</button>
          </div>)
        : null
      }
    </div>
  );
}

// function stateToProps(state) {
//   return {
//     state : state.reducer,
//     alert확인 : state.reducer2
//   }
// }

// export default connect(stateToProps)(Cart);

export default Cart;