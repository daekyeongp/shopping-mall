import { Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap';
import React, { useContext, useState, lazy, Suspense } from 'react';
import './App.css';
import Data from './components/data.js';
import Data2 from './components/data2.js';
// import Detail from './Detail.js';
import { Link, Route, Switch } from 'react-router-dom';
import Cart from './components/Cart.js';
export let 재고context = React.createContext();
export let 재고2context = React.createContext();
let Detail = lazy(()=>{ return import('./Detail.js') });


function App() {

  let [shoes, setShoes] = useState(Data);
  let [shoesNumber, setShoesNumber] = useState([10, 11, 12]);
  let lately = localStorage.getItem('obj');
  let latelyNum = JSON.parse(lately);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Dekay-Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/cart">cart</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="https://github.com/daekyeongp">Github</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://velog.io/@daekyeong">Velog</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <div className="background">
            <h1>Dekay Shop</h1>
            <p>Simple shop</p>
            <p>
              <Button variant="dark" href="https://github.com/daekyeongp" className="main-button">Github</Button>
              <Button variant="dark" href="https://velog.io/@daekyeong" className="main-button">Velog</Button>
            </p>
          </div>

          <div className="container">


          <재고context.Provider value={shoesNumber}>



            <div className="row">
              {
                shoes.map((shoes, i) => {
                  return <ShoesAdd stitle={shoes} i={i} />
                })
              }
            </div>

            </재고context.Provider>


            <button className="btn btn-primary" onClick={()=>{
              setShoes([...shoes, ...Data2]);
            }}>더보기</button>
          </div>
        </Route>

        <재고2context.Provider value={shoesNumber}>


        <Route path="/cart">
          <Cart></Cart>
        </Route>


        <Route path="/detail/:id">
          <Suspense fallback={<div>로딩중 입니다.</div>}>
            <Detail shoes={shoes} shoesNumber={shoesNumber} setShoesNumber={setShoesNumber}/>
          </Suspense>
        </Route>

        </재고2context.Provider>
      </Switch>
       

      {/* <Route path="/어쩌구" component={modal}></Route> */}
    </div>
  );
}

function ShoesAdd(props) {

  let 재고 = useContext(재고context);
  // let history = useHistory(); 이건 div 눌렀을 때 가고싶으면 사용해보기
  return (
    <div className="col-md-4">
      <Link to={'/detail/' + (props.stitle.id) }>
        {/* //require만 붙이면 이미지가 아닌 객체가 return되기 때문에 default */}
        <img src={require('./image/shoes' + (props.stitle.id) + '.jpg').default} width="100%" />
      </Link>
      <h4>{ props.stitle.title }</h4>
      <p>{ props.stitle.content }</p>
      <p>{ props.stitle.price }</p>
      <p>{재고[props.i]}</p>
    </div>
  );
};

export default App;
