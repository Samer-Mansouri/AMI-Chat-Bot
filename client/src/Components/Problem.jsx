import React, { useState } from 'react'
import axios from 'axios';

export default function Problem() {
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [problem, setProblem] = useState('')
  const [err, setErr] = useState(false)
  const [load, setLoad] = useState(false)
  const [success, setSuccess] = useState(false)
  
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  } 
  const sendProblem = () => {


    if(firstName === "" || lastName === "" || email === ""  || !validateEmail(email) || problem === ""){
      setErr(true);
    } else {
      if(err){
        setErr(false)
      }
      setLoad(true);
      axios.post('http://127.0.0.1:5000/api/msg/problem', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      problem: problem,
    })
    .then(response => {
     
        setLoad(false);
        setSuccess(true);
        console.log(response.data)
    })
    .catch(function (error) {
      setLoad(false);
      console.log(error);
    });
    }
    

  }
    return (
        <>
       <div>
        <a className="nav-link" id="modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Signaler un probléme
        </a>

        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Signaler un probléme</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
              {
                err ?   <div className="alert alert-danger" role="alert">
                Veuillez vérifier vos informations !
              </div> : "" 
              }

              {
                success ?   <div className="alert alert-success" role="alert">
                Votre probléme a été signalé avec succés !
              </div> : "" 
              }
                 <form>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Prénom</label>
                        <input type="text" className="form-control" id="firstName" name="firstName" 
                        onChange={(e) => {
                          setFirstName(e.target.value)
                        }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Nom</label>
                        <input type="text" className="form-control" id="lastName" name="lastName" 
                        onChange={(e) => {
                          setLastName(e.target.value)
                        }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="problem" class="form-label">Décrire votre probléme</label>
                        <textarea class="form-control" id="problem" rows="3"
                        onChange={(e) => {
                          setProblem(e.target.value)
                        }}
                        ></textarea>
                    </div>
                    
                </form>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn myButt" data-bs-dismiss="modal">Fermer</button>
                <button type="button" className="btn myButt" 
                 onClick={(e) => {
                  e.preventDefault();
                  sendProblem();
                }}
                >Envoyer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}
