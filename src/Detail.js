import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './components/detail.scss';
import {재고2context} from './App.js';
import { Nav } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { connect } from "react-redux";

let 박스 = styled.div`
    padding-top : 20px;
`;
let 제목 = styled.h4`
    font-size : 25px;
    color : ${ props => props.color };
`;


function Detail(props) {
    let [disset, setDisset] = useState(true); // DisplayModal 보일지 말지 지정
    let [tab, setTab] = useState(0);
    let [tabSwitch, setTabSwitch] = useState(false);

    let 재고 = useContext(재고2context);

    useEffect(()=>{ // 컴포넌트 mount, update 될 때 코드를 실행
        //2초 후 my-alert 안보이게 하는 코드
        let timer = setTimeout(()=>{ setDisset(false) }, 2000);
        // return function 기능() { 실행할 코드 ~~ } // Detail 컴포넌트 사라질 때(unmount) 실행되는 코드
        // return () => { 실행할 코드 ~~ } // Detail 컴포넌트 사라질 때(unmount) 실행되는 코드
        return ()=>{ clearTimeout(timer) };
    }, [disset]);
    
    
    let { id } = useParams(); // {}이 남음
    let history = useHistory();

    let styled = {display: disset}
    let findId = props.shoes.find(function(shoes){
        return shoes.id == id;
    });

    useEffect(()=>{
        var arr = localStorage.getItem('watched');
        if ( arr == null ) {
            arr = [];
        } else {
            arr = JSON.parse(arr);
        }
        
        arr.push(id);
        arr = new Set(arr);
        arr = [...arr];

        localStorage.setItem('watched', JSON.stringify(arr));
    }, []);

    // let storage = localStorage.setItem('obj', JSON.stringify({id: findId.id}));

    return (
        <div className="container">
            <박스>
                <제목 className="red">Detail</제목>
            </박스>
            {
                disset === true
                ? <DisplayModal />
                : null
            }
            
            <div className="row">
                <div className="col-md-6">
                    <img src={require('./image/shoes' + findId.id + '.jpg').default} width="100%" />
                </div>
                <div className="col-md-5 mt-4">
                    <h4 className="pt-5">{findId.title}</h4>
                    <p>{findId.content}</p>
                    <p>{findId.price}</p>
                    <p>{재고}</p>
                    {/* <Info shoesNumber={props.shoesNumber}/> */}
                    <button className="btn btn-danger" onClick={()=>{ 
                        props.setShoesNumber([9,10,11]);
                        props.dispatch({ type: '항목추가',
                        payload: {id:findId.id, name:findId.title, quan:1} });
                        history.push('/cart');
                        }}>주문하기</button>
                        
                    <button className="btn btn-danger" onClick={ ()=>{
                        // history.goBack();
                        history.push('/');
                    } }>뒤로가기</button>
                </div>
                <div className="col-md-1 mt-4">
                    <p>최근본 항목</p>
                </div>
            </div>

            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
            <Nav.Item>
                <Nav.Link eventKey="link-0" onClick={()=>{ setTabSwitch(false); setTab(0) }}>Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={()=>{ setTabSwitch(false); setTab(1) }}>Option 2</Nav.Link>
            </Nav.Item>
            </Nav>

            <CSSTransition in={tabSwitch} classNames="Tabwow" timeout={500}>
                <TabContent tab={tab} setTabSwitch={setTabSwitch}/>
            </CSSTransition>


            </div>
    );
}

function TabContent(props) {

    useEffect(() => {
        props.setTabSwitch(true);
    });

    if(props.tab === 0) {
        return <div>0번째 내용</div>
    } else if (props.tab === 1) {
        return <div>1번째 내용</div>
    }
}

function DisplayModal() {
    return (
        <div className="my-alert">
            <p>재고가 얼마 남지 않았습니다.</p>
        </div>
    );
}

function WatchedItem(props) {
    console.log(props.latelyNum);
    return(
        <div className="col-md-4">
            {/* //require만 붙이면 이미지가 아닌 객체가 return되기 때문에 default */}
            <img src={require('./image/shoes' + (props.latelyNum.id) + '.jpg').default} width="30%" />
            <p>{ props.stitle[props.latelyNum.id].title }</p>
        </div>
    );
}


// function Info(props) {
//     return (
//         <p>재고: {props.shoesNumber[0]}</p>
//     );
// }

function stateToProps(state) {
    return {
      state : state.reducer,
      alert확인 : state.reducer2
    }
  }
  
  export default connect(stateToProps)(Detail);