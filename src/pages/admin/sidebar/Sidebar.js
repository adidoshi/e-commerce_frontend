import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import {
  ExpandMore,
  PostAdd,
  Add,
  ImportExport,
  ListAlt,
  Dashboard,
  People,
  RateReview,
} from "@material-ui/icons";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <Link className="sidebarSubs" to="/">
          <h3>Home</h3>
        </Link>
        <Link className="sidebarSubs" to="/admin/dashboard">
          <p>
            <Dashboard /> Dashboard
          </p>
        </Link>
        <span className="sidebarSubs">
          <TreeView
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ImportExport />}>
            <TreeItem nodeId="1" label="Products">
              <Link className="sidebarSubs" to="/admin/products">
                <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
              </Link>

              <Link className="sidebarSubs" to="/admin/product">
                <TreeItem nodeId="3" label="Create" icon={<Add />} />
              </Link>
            </TreeItem>
          </TreeView>
        </span>

        <Link className="sidebarSubs" to="/admin/orders">
          <p>
            <ListAlt />
            Orders
          </p>
        </Link>
        <Link className="sidebarSubs" to="/admin/users">
          <p>
            <People /> Users
          </p>
        </Link>
        <Link className="sidebarSubs" to="/admin/reviews">
          <p>
            <RateReview />
            Reviews
          </p>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
