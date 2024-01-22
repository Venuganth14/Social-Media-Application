import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFollowerAccounts } from "../feature/followingAccounts/followingAccountSlice";
import FollowerAccountItem from "./FollowerAccountItem";
import { Table, Col, Row} from "react-bootstrap";
import NewsFeedContent from "./NewsFeedContent";


function FollowerList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeFollowerAccounts = useSelector(
    (state) => state.followingAccountReducer.followerAccounts
  );

  useEffect(() => {
    if (localStorage.getItem("psnToken") === null) {
      navigate("/unauthorized");
    }
    
    dispatch(getFollowerAccounts());
  }, []);

  return (
    <div>
       <Row>
         <Col md={5}>
    <Table >
    <div>
      <h1>Followers</h1>
      <tbody>
      {storeFollowerAccounts ? (
        storeFollowerAccounts.map((followerAccount) => {
          return (
            <FollowerAccountItem
              key={followerAccount.id}
              id={followerAccount.id}
              firstName={followerAccount.firstName}
              lastName={followerAccount.lastName}
            />
          );
        })
      ) : (
        <span></span>
      )}
      </tbody>
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

export default FollowerList;
