import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./AdminDashboard.css";


function AdminDashboard() {


  const [documents, setDocuments] = useState([]);





  const fetchDocuments = async () => {

    try {

      const token = localStorage.getItem("token");


      const res = await API.get("/document/all", {

        headers:{
          Authorization:`Bearer ${token}`,
        },

      });

      console.log(res.data);
      const incomingDocs = res.data?.documents;
      console.log("doc: ",incomingDocs)
      

      // setDocuments(...res.data.documents);
      // setUsers(prevUsers => [...prevUsers, ...apiData]);
      setDocuments(prevDoc => [...prevDoc, ...incomingDocs])



    } catch(error){

      alert("Failed to load documents", error);

    }

  };

  useEffect(() => {

    fetchDocuments();

  }, []);





  const updateStatus = async (id,status)=>{


    try{


      const token = localStorage.getItem("token");


      await API.put(

        `/document/${id}`,

        {status},


        {

          headers:{
            Authorization:`Bearer ${token}`,
          },

        }

      );



      alert(`Document ${status} Successfully`);



      fetchDocuments();



    }
    catch(error){

      alert("Failed to update status");

    }


  };





  return (

    <>

    <Navbar />


    <div className="admin-page">


      <div className="admin-container">



        <div className="admin-header text-center">


          <div className="admin-logo">

            <i className="bi bi-person-workspace"></i>

          </div>


          <h2>
            Admin Dashboard
          </h2>


          <p>
            Manage and verify uploaded documents
          </p>


        </div>





        <div className="stats-box">


          <div className="stat-card">

            <h3>
              {documents.length}
            </h3>

            <span>
              Total Documents
            </span>


          </div>




          <div className="stat-card">

            <h3>
              {
                documents.filter(
                  d=>d.status==="Pending"
                ).length
              }
            </h3>

            <span>
              Pending
            </span>

          </div>




          <div className="stat-card">

            <h3>
            {
              documents.filter(
                d=>d.status==="Approved"
              ).length
            }
            </h3>

            <span>
              Approved
            </span>

          </div>



        </div>








        <div className="table-box">


        <div className="table-responsive">


        <table className="table admin-table">


          <thead>

            <tr>

              <th>User</th>

              <th>Email</th>

              <th>Document</th>

              <th>Status</th>

              <th>Action</th>


            </tr>

          </thead>




          <tbody>


          {
            documents.map((doc)=>(


              <tr key={doc._id}>


                <td>

                <i className="bi bi-person-fill me-2"></i>

                {doc.name}

                </td>



                <td>

                {doc.email}

                </td>



                <td>

                <i className="bi bi-file-earmark-text me-2"></i>

                {doc.documentName}

                </td>




                <td>


                <span

                className={
                  `status ${
                    doc.status==="Approved"
                    ?
                    "approved"
                    :
                    doc.status==="Rejected"
                    ?
                    "rejected"
                    :
                    "pending"
                  }`
                }

                >

                {doc.status}

                </span>


                </td>




                <td>


                <button

                className="approve-btn"

                onClick={()=>
                  updateStatus(doc._id,"Approved")
                }

                >

                <i className="bi bi-check-circle"></i>
                Approve

                </button>




                <button

                className="reject-btn"

                onClick={()=>
                  updateStatus(doc._id,"Rejected")
                }

                >

                <i className="bi bi-x-circle"></i>
                Reject

                </button>


                </td>



              </tr>


            ))
          }



          </tbody>


        </table>


        </div>


        </div>



      </div>


    </div>


    </>

  );

}


export default AdminDashboard;