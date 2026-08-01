import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./MyDocument.css";

function MyDocuments() {

  const [documents, setDocuments] = useState([]);


  useEffect(() => {
    fetchDocuments();
  }, []);



  const fetchDocuments = async () => {

    try {

      const token = localStorage.getItem("token");


      const res = await API.get("/document/mydocuments", {

        headers:{
          Authorization:`Bearer ${token}`,
        },

      });


      setDocuments(res.data.documents);


    } catch(error){

      alert("Failed to load documents");

    }

  };



  return (

    <>

    <Navbar />


    <div className="documents-page">


      <div className="documents-card">


        <div className="text-center mb-4">


          <div className="document-logo">

            <i className="bi bi-file-earmark-check-fill"></i>

          </div>


          <h2>
            My Documents
          </h2>


          <p>
            Track your document verification status
          </p>


        </div>





        <div className="table-responsive">


          <table className="table document-table">


            <thead>

              <tr>

                <th>
                  Document
                </th>


                <th>
                  Status
                </th>


                <th>
                  Uploaded On
                </th>


              </tr>


            </thead>




            <tbody>


            {
              documents.length > 0 ?

              (

                documents.map((doc)=>(


                  <tr key={doc._id}>


                    <td>

                      <i className="bi bi-file-text me-2"></i>

                      {doc.documentName}

                    </td>




                    <td>


                    <span

                    className={
                      `status-badge ${
                        doc.status === "Approved"
                        ? "approved"
                        :
                        doc.status === "Rejected"
                        ? "rejected"
                        :
                        "pending"
                      }`
                    }

                    >

                    {
                      doc.status
                    }


                    </span>


                    </td>




                    <td>

                    {
                      new Date(doc.createdAt)
                      .toLocaleDateString()
                    }

                    </td>



                  </tr>


                ))

              )


              :


              (

                <tr>

                  <td 
                  colSpan="3"
                  className="text-center"
                  >

                    No Documents Found

                  </td>


                </tr>


              )


            }


            </tbody>


          </table>


        </div>



      </div>



    </div>


    </>

  );

}


export default MyDocuments;