import React from "react";
import { IContactForm } from "../../common/interfaces/IContactForm";

// Bootstrap style
import { Card, Button } from "react-bootstrap";

interface ICardButton {
   onClick?: () => void;
}

export const UserCard: React.FC<IContactForm & ICardButton> = (props) => {
   const { firstName, lastName, email, note, onClick } = props;
   return (
      <Card className="mb-3">
         <Card.Header className="text-capitalize bg-secondary text-light">
            {firstName} {lastName}
         </Card.Header>
         <Card.Body>
            <Card.Text>
               <span className="d-block">Email: {email}</span>
               <span className="d-block">Note: {note}</span>
            </Card.Text>
            <Button variant="primary" onClick={onClick}>
               Delete User
            </Button>
         </Card.Body>
      </Card>
   );
};
