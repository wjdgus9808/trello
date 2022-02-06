import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "../atom";
import { SubmitHandler, useForm } from "react-hook-form";
interface ICategory {
  category: string;
}
function AddCategory() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue, setFocus } = useForm<ICategory>();
  const onValid = ({ category }: ICategory) => {
    setToDos({ ...toDos, [category]: [] });
    setValue("category", "");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          type="text"
          {...register("category", { required: true })}
          placeholder="write category"
        ></input>
      </form>
    </>
  );
}
export default AddCategory;
