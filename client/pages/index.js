import { useEffect } from "react";
import { useSelector } from "react-redux";
import PostLogin from "../components/PostLogin";
import PreLogin from "../components/PreLogin";
// import userReducer from "../reducer/userReducer";

export default function Home() {
  const {user} = useSelector(state => state.userReducer)
  // debugger
  return (
    <div>
     {user ? <PostLogin/> : <PreLogin/>}
    </div>
  )
}

// const MapStateToProps =
