import React, { useRef, useState } from "react";
import { IContactForm } from "../../common/interfaces/IContactForm";
import { useForm } from "react-hook-form";

// Bootstrap
import { Form, Button } from "react-bootstrap";

export const ContactForm: React.FC = (props) => {
   const {} = props;
   const [formData, setFormData] = useState<object[]>([]);
   const { register, handleSubmit } = useForm<IContactForm>();
   return (
      <div>
         <Form
            onSubmit={handleSubmit((data: IContactForm) => {
               setFormData([data]);
            })}
         >
            <Form.Group controlId="contactFormFirstName">
               <Form.Label>First Name</Form.Label>
               <Form.Control
                  type="text"
                  {...(register("firstName"), { required: true })}
               />
            </Form.Group>
            <Form.Group controlId="contactFormLastName">
               <Form.Label>Last Name</Form.Label>
               <Form.Control
                  type="text"
                  {...(register("lastName"), { required: true })}
               />
            </Form.Group>
            <Form.Group controlId="contactFormEmail">
               <Form.Label>Email address</Form.Label>
               <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: true })}
               />
            </Form.Group>
            <Form.Group controlId="contactFormNote">
               <Form.Label>Note</Form.Label>
               <Form.Control
                  as="textarea"
                  type="text"
                  {...(register("note"), { required: true })}
               />
            </Form.Group>
            <Button variant="primary" type="submit">
               Submit
            </Button>
         </Form>
      </div>
   );
};
