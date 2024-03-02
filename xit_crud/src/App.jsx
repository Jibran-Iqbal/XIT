
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TablePage from './TablePage';
import New from "./New";


function App() {

  const employeeInputs = [
    {
      id: 2,
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Name",
    },
    {
      id: 3,
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: 4,
      label: "Phone",
      name: "phone",
      type: "text",
      placeholder: "Phone Number",
    },
  ];
  
  

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TablePage/>}/>
        <Route path='/new' element={<New inputs={employeeInputs}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
