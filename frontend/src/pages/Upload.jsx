import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Tesseract from "tesseract.js";
import "./Upload.css";

function Upload() {

  const [documentName, setDocumentName] = useState("");
  const [otherDocument, setOtherDocument] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [ocrText, setOcrText] = useState("");


  const handleUpload = async (e) => {

    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    // OCR Start
setChecking(true);

const result = await Tesseract.recognize(file, "eng");

const extractedText = result.data.text.toLowerCase();

setOcrText(extractedText);

console.log("OCR Text:", extractedText);

// Aadhaar Validation
if (documentName === "Aadhar Card") {

  const isAadhaar =
    extractedText.includes("aadhaar") ||
    extractedText.includes("government of india") ||
    extractedText.includes("unique identification authority");

  if (!isAadhaar) {
    alert("❌ Please upload a valid Aadhaar Card.");
    setChecking(false);
    return;
  }
}

// PAN Validation
if (documentName === "PAN Card") {

  const isPan =
    extractedText.includes("income tax") ||
    extractedText.includes("permanent account number");

  if (!isPan) {
    alert("❌ Please upload a valid PAN Card.");
    setChecking(false);
    return;
  }
}

// OCR End


    const formData = new FormData();


    formData.append(
      "documentName",
      documentName === "Other" ? otherDocument : documentName
    );


    formData.append("document", file);


    try {

      setLoading(true);


      const token = localStorage.getItem("token");


      const res = await API.post(
        "/document/upload",
        formData,
        {
          headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"multipart/form-data",
          },
        }
      );


      alert(res.data.message);


      setDocumentName("");
      setOtherDocument("");
      setFile(null);


      document.getElementById("fileInput").value="";


    } catch(error){

      alert(
        error.response?.data?.message || 
        "Upload Failed"
      );

    }
    finally{

  setLoading(false);
  setChecking(false);

}

  };



  return (

    <>

      <Navbar />


      <div className="upload-page">


        <div className="upload-card">


          <div className="text-center mb-4">


            <div className="upload-logo">

              <i className="bi bi-cloud-arrow-up-fill"></i>

            </div>


            <h2>
              Upload Document
            </h2>


            <p>
              Secure Document Verification System
            </p>


          </div>



          <form onSubmit={handleUpload}>


            <div className="mb-3">


              <label className="form-label fw-bold text-white">
                Select Document
              </label>



              <select

                className="form-select"

                value={documentName}

                onChange={(e)=>setDocumentName(e.target.value)}

                required

              >


                <option value="">
                  -- Select Document --
                </option>



                <optgroup label="Identity Documents">

                  <option value="Aadhar Card">
                    Aadhar Card
                  </option>

                  <option value="PAN Card">
                    PAN Card
                  </option>

                  <option value="Voter ID">
                    Voter ID
                  </option>

                  <option value="Passport">
                    Passport
                  </option>

                  <option value="Driving License">
                    Driving License
                  </option>

                </optgroup>




                <optgroup label="Educational Documents">


                  <option value="10th Marksheet">
                    10th Marksheet
                  </option>


                  <option value="12th Marksheet">
                    12th Marksheet
                  </option>


                  <option value="Graduation Marksheet">
                    Graduation Marksheet
                  </option>


                  <option value="Degree Certificate">
                    Degree Certificate
                  </option>


                </optgroup>





                <optgroup label="Government Certificates">


                  <option value="Income Certificate">
                    Income Certificate
                  </option>


                  <option value="Caste Certificate">
                    Caste Certificate
                  </option>


                  <option value="Domicile Certificate">
                    Domicile Certificate
                  </option>


                  <option value="Birth Certificate">
                    Birth Certificate
                  </option>


                </optgroup>



                <option value="Other">
                  Other
                </option>


              </select>


            </div>





            {
              documentName === "Other" && (

                <div className="mb-3">


                  <label className="form-label fw-bold text-white">
                    Enter Document Name
                  </label>


                  <input

                    type="text"

                    className="form-control"

                    placeholder="Enter Document Name"

                    value={otherDocument}

                    onChange={(e)=>setOtherDocument(e.target.value)}

                    required

                  />


                </div>

              )
            }







            <div className="mb-4">


              <label className="form-label fw-bold text-white">

                Upload File

              </label>



              <input

                id="fileInput"

                type="file"

                className="form-control"

                accept=".jpg,.jpeg,.png,.pdf"

                onChange={(e)=>setFile(e.target.files[0])}

                required

              />



              <small className="text-light">

                JPG, PNG & PDF only

              </small>


            </div>







            <button

              className="btn upload-btn w-100"

              type="submit"

              disabled={loading}

            >


              {
                loading ?

                (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Uploading...
                  </>
                )

                :

                "Upload Document"

              }


            </button>



          </form>



        </div>



      </div>


    </>

  );

}


export default Upload;