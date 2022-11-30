import NewForm from "./NewForm";

type Props = {};

const NewNote = (props: Props) => {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NewForm />
    </>
  );
};

export default NewNote;
