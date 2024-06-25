import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export const ModalForm = (props) => {
  return (
    <Modal
      initialFocusRef={props.initialRef}
      isOpen={props.isOpen}
      onClose={props.onClose}
      size={"xl"}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.modalHeader}</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={4}>{props.children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
