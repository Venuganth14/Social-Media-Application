import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { getFollowingAccounts } from "../feature/followingAccounts/followingAccountSlice";
import FollowingAccountItem from "./FollowingAccountItem";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Table, Col, Row} from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import {getFollowingPosts} from "../feature/followingPost/followingPostSlice";

import PostItem from "./PostItem";


import "../components/styles/FollowingList.module.css";
import NewsFeedContent from "./NewsFeedContent";

function FollowingList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeFollowingAccounts = useSelector(
    (state) => state.followingAccountReducer.followingAccounts
  );
  const storeFollowingPosts = useSelector((state) => state.followingPostReducer.followingPosts);

  useEffect(() => {
    if (localStorage.getItem("psnToken") === null) {
      navigate("/unauthorized");
    }
    
    dispatch(getFollowingAccounts());
  }, []);

  
  return (
    <div>
      <Row>
        
      <Col md={5}>
    <Table >
    <div className="following-list-container">
      <h1>Following </h1>
      <div className="following-accounts">
        <tbody>
      {storeFollowingAccounts ? (
        storeFollowingAccounts.map((followingAccount) => {
          return (
            <FollowingAccountItem
              key={followingAccount.id}
              id={followingAccount.id}
              firstName={followingAccount.firstName}
              lastName={followingAccount.lastName}
            />
          );
        })
      ) : (
        <span></span>
      )}
      </tbody>
      </div>
    </div>
    
    
    </Table>
    </Col>
     <Col md={7}>
     <Table >
     <div>
     <tbody>
      <NewsFeedContent/>
      {/* <h1>NewsFeedContent page</h1> */}
 
      {/* {storeFollowingPosts !== null ? (
        storeFollowingPosts.map((post) => {
          return (
            <PostItem
              key={post.post.id}
              postId={post.post.id}
              userId={post.user.id}
              firstName={post.user.firstName ||"" }
              lastName={post.user.lastName ||"" }
              content={post.post.content ||"" }
              image={post.post.image}
              images={post.post.images}
              loveList={post.post.love}
              shareList={post.post.share}
              commentList={post.post.comment}
              postDate={post.post.createdAt}
            />
          );
        })
      ) : (
        <div className="d-flex justify-content-center align-items-center my-5">
          <Spinner animation="border" variant="success" />
        </div>
      )} */}
    </tbody>
    </div>
   </Table>
   </Col>
   
   </Row>
   </div>
   
  );
}

export default FollowingList;
