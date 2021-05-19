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
      <Card>
         <Card.Header>
            {firstName} {lastName}
         </Card.Header>
         <Card.Body>
            <Card.Text>
               <p>Email: {email}</p>
               <p>Note: {note}</p>
            </Card.Text>
            <Button variant="danger" onClick={onClick}>
               Delete User
            </Button>
         </Card.Body>
      </Card>
   );
};
