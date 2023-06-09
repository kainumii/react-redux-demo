import "./App.css";
import PostsList from "./components/PostsList";
import { Route, Routes } from "react-router-dom";
import SinglePost from "./components/SinglePost";
import HeaderComponent from "./components/HeaderComponent";
import TwitterComponent from "./components/TwitterComponent";
import Buttons from "./components/Buttons";
import Parent from "./components/Parent";
import Users from "./components/Users";
import AddPostForm from "./components/AddPost";
import ParkingSpaces from "./components/ParkingSpaces";
import RoadWorks from "./components/RoadWorks";
import MapBoxDemo from "./components/MapBoxDemo";
import { EditPostForm } from "./components/EditPost";
import UsersList from "./components/UsersList";
import UserPage from "./components/UserPage";
import Photos from "./components/Photos";
import ContextDemo from "./components/ContextDemo";
import CharacterCounter from "./components/CharacterCounter";
import RoadWorkOnMap from "./components/RoadWorkOnMap";

function App() {
  return (
    <div>
      <HeaderComponent />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddPostForm />
              <PostsList />
            </>
          }
        />
        {/* <Route path="/yksittainen_item" element={<SinglePost />} /> */}
        <Route path="/twitter" element={<TwitterComponent />} />
        {/* <Route path="/buttons" element={<Buttons />} />
        <Route path="/parent" element={<Parent />} />
        <Route path="/users" element={<Users />} /> */}
        <Route path="/parkingspaces" element={<ParkingSpaces />} />
        <Route path="/roadworks" element={<RoadWorks />} />
        <Route path="/mapboxdemo" element={<MapBoxDemo />} />
        <Route exact path="/posts/:postId" element={<SinglePost />}></Route>
        <Route exact path="/editPost/:postId" element={<EditPostForm />} />
        <Route exact path="photos" element={<Photos />} />
        <Route exact path="/users" element={<UsersList />} />
        <Route exact path="/users/:userId" element={<UserPage />} />
        <Route exact path="/contextdemo" element={<ContextDemo />} />
        <Route
          exact
          path="/charactercounter"
          element={<CharacterCounter maxCharacters="160" />}
        />
        <Route exact path="/roadworkonmap" element={<RoadWorkOnMap />} />
      </Routes>
    </div>
  );
}

export default App;
