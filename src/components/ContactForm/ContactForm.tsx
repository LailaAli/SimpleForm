import React, { useState, useEffect, useRef } from "react";
import { IContactForm } from "../../common/interfaces/IContactForm";
// Components
import { UserCard } from "../UserCard/UserCard";
// Bootstrap styles
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
// 3PL
import { useForm } from "react-hook-form";
// API
import { getDataFromLocal, storeToLocal } from "../../api/localStorageApi";
import { clearTimeout } from "timers";

// Interfaces
// interface IContactFormProps {
//    methods?: any;
// }

const defaultValues: IContactForm = {
   firstName: "",
   lastName: "",
   email: "",
   note: "",
};

export const ContactForm: React.FC = () => {
   // List of form submissions
   const [submissions, setSubmissions] = useState<IContactForm[]>(() =>
      getDataFromLocal("data")
   );

   const timeOutRef = useRef<ReturnType<typeof setTimeout>>();

   // Hide success message
   const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitSuccessful, isSubmitted, isValid },
      setFocus,
   } = useForm<IContactForm>();

   // Submit form and save to local storage
   const onSubmit = (data: IContactForm) => {
      const newData = [...submissions, data];
      setSubmissions(newData);
      showMessage();
      // Optional: Call store to local in useEffect

      // storeToLocal("data", newData);
      reset(defaultValues);
   };

   // Delete submission
   const deleteSubmission = (index: number) => {
      const newSubmissions = submissions;
      newSubmissions.splice(index, 1);
      setSubmissions([...newSubmissions]);
      // storeToLocal("data", submissions);
   };

   // Hide seems to only run the first time the form is submitted not every time.
   // Hide success message
   const showMessage = () => {
      if (isValid) {
         setShowSuccessMessage(true);
      } else {
         console.log(errors);
      }
      timeOutRef.current = setTimeout(() => {
         setShowSuccessMessage(false);
      }, 1400);
   };

   useEffect(() => {
      return () => {
         timeOutRef.current && clearTimeout(timeOutRef.current);
      };
   }, []);

   // Set focus on first field on page load and form submission
   useEffect(() => {
      setFocus("firstName");
   }, [setFocus, isSubmitted]);

   useEffect(() => {
      storeToLocal("data", submissions);
   }, [submissions]);

   console.log("errors", errors);
   console.log("isSubmitSuccessful", isSubmitSuccessful);
   console.log("isSubmitted", isSubmitted);
   console.log("hide msg", showSuccessMessage);

   return (
      <Container className="pt-5">
         <Row>
            {/* Form */}
            <Col className="col-12 col-md-6 mb-4">
               <Card>
                  <Card.Header className="text-capitalize bg-secondary text-light">
                     Add User
                  </Card.Header>
                  <Card.Body>
                     <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="contactFormFirstName">
                           <Form.Label>First Name</Form.Label>
                           <Form.Control
                              aria-invalid={errors.firstName ? "true" : "false"}
                              className={errors.firstName ? "error" : ""}
                              type="text"
                              {...register("firstName", {
                                 required: "This field is required",
                              })}
                           />
                           {errors.firstName &&
                              errors.firstName.type === "required" && (
                                 <p className="errorText" role="alert">
                                    {errors.firstName.message}
                                 </p>
                              )}
                        </Form.Group>
                        <Form.Group controlId="contactFormLastName">
                           <Form.Label>Last Name</Form.Label>
                           <Form.Control
                              aria-invalid={errors.lastName ? "true" : "false"}
                              className={errors.lastName ? "error" : ""}
                              type="text"
                              {...register("lastName", {
                                 required: "This field is required",
                              })}
                           />
                           {errors.lastName &&
                              errors.lastName.type === "required" && (
                                 <p className="errorText" role="alert">
                                    {errors.lastName.message}
                                 </p>
                              )}
                        </Form.Group>
                        <Form.Group controlId="contactFormEmail">
                           <Form.Label>Email address</Form.Label>
                           <Form.Control
                              aria-invalid={errors.email ? "true" : "false"}
                              className={errors.email ? "error" : ""}
                              type="email"
                              placeholder="name@example.com"
                              {...register("email", {
                                 required: "This field is required",
                              })}
                           />
                           {errors.email && errors.email.type === "required" && (
                              <p className="errorText" role="alert">
                                 {errors.email.message}
                              </p>
                           )}
                        </Form.Group>
                        <Form.Group controlId="contactFormNote">
                           <Form.Label>Note</Form.Label>
                           <Form.Control
                              as="textarea"
                              aria-invalid={errors.note ? "true" : "false"}
                              className={errors.note ? "error" : ""}
                              type="text"
                              {...register("note", {
                                 required: "This field is required",
                              })}
                           />
                           {errors.note && errors.note.type === "required" && (
                              <p className="errorText" role="alert">
                                 {errors.note.message}
                              </p>
                           )}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                           Submit
                        </Button>
                     </Form>
                  </Card.Body>
               </Card>
               {showSuccessMessage && (
                  <p className="mt-2 text-success text-md-center">
                     Your message has been sent!
                  </p>
               )}
            </Col>
            {/* Submission List  */}
            <Col className="col-12 col-md-6">
               {submissions.map((user: any, index: number) => (
                  <UserCard
                     key={index}
                     firstName={user.firstName}
                     lastName={user.lastName}
                     email={user.email}
                     note={user.note}
                     onClick={() => deleteSubmission(index)}
                  />
               ))}
            </Col>
         </Row>
      </Container>
   );
};
