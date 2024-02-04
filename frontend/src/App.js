import { useEffect, useState } from "react";

function App() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    fetch(process.env.REACT_APP_DOMAIN_SERVER + '/query/student', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(API => API.json())
      .then(data => {
        setStudents(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  console.log(process.env.REACT_APP_DOMAIN_SERVER);

  return (
    <div className="App">
      <h1>Danh sách sinh viên!</h1>
      <ul>
        {
          students.map(student => {
            return <li> {student.full_name} - {student.sex} </li>
          })
        }
      </ul>
    </div>
  );
}

export default App;
