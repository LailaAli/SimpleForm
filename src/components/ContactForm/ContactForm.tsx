import React, { useState, useEffect } from "react";
import { IContactForm } from "../../common/interfaces/IContactForm";
import { useForm } from "react-hook-form";

// Bootstrap styles
import { Form, Button, Card } from "react-bootstrap";

interface IContactFormProps {
   methods?: any;
}

const defaultValues = { firstName: "", lastName: "", email: "", note: "" };

export const ContactForm: React.FC<IContactFormProps> = () => {
   const [formData, setFormData] = useState<IContactForm[]>([]);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitSuccessful, isSubmitted },
      setFocus,
   } = useForm<IContactForm>();

   // Submit form
   const onSubmit = (data: IContactForm) => {
      const newData = [];
      newData.push(data);
      setFormData(newData);
      reset(defaultValues);
   };

   // Set focus on first field on page load and form submission
   useEffect(() => {
      setFocus("firstName");
   }, [setFocus, isSubmitted]);

   return (
      <Card>
         <Card.Header>Add User</Card.Header>
         <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
               <Form.Group controlId="contactFormFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                     className={errors.firstName ? "error" : ""}
                     type="text"
                     {...register("firstName", {
                        required: "This field is required",
                     })}
                  />
                  {errors.firstName && (
                     <p className="errorText">{errors.firstName.message}</p>
                  )}
               </Form.Group>
               <Form.Group controlId="contactFormLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                     className={errors.lastName ? "error" : ""}
                     type="text"
                     {...register("lastName", {
                        required: "This field is required",
                     })}
                  />
                  {errors.lastName && (
                     <p className="errorText">{errors.lastName.message}</p>
                  )}
               </Form.Group>
               <Form.Group controlId="contactFormEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                     className={errors.email ? "error" : ""}
                     type="email"
                     placeholder="name@example.com"
                     {...register("email", {
                        required: "This field is required",
                     })}
                  />
                  {errors.email && (
                     <p className="errorText">{errors.email.message}</p>
                  )}
               </Form.Group>
               <Form.Group controlId="contactFormNote">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                     as="textarea"
                     className={errors.note ? "error" : ""}
                     type="text"
                     {...register("note", {
                        required: "This field is required",
                     })}
                  />
                  {errors.note && (
                     <p className="errorText">{errors.note.message}</p>
                  )}
               </Form.Group>
               <Button variant="primary" type="submit">
                  Submit
               </Button>
            </Form>
         </Card.Body>
         {/* {isSubmitSuccessful && <p>Your message has been sent!</p>} */}

         {formData.map((item) => item.email)}
      </Card>
   );
};
