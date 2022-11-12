import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
	return (
		<div className="sidebar-wrapper">
			<nav id="sidebar">
				<ul className="list-unstyled components mt-4">
					<li>
						<Link to="/dashboard">
							<i className="fa fa-tachometer"></i> Dashboard
						</Link>
					</li>

					<li>
						<a
							href="#productSubmenu"
							data-toggle="collapse"
							aria-expanded="false"
							className="dropdown-toggle"
						>
							<i className="fa fa-product-hunt"></i> Books
						</a>
						<ul className="collapse list-unstyled" id="productSubmenu">
							<li>
								<Link to="/getallbook">
									<i className="fa fa-clipboard"></i> All
								</Link>
							</li>

							<li>
								<Link to="/addbook">
									<i className="fa fa-plus"></i> Create
								</Link>
							</li>
							<li>
								<Link to="/admin/listbook">
									 Detail All book
								</Link>
							</li>
						</ul>
					</li>
					<li>
						<a
							href="#categorySubmenu"
							data-toggle="collapse"
							aria-expanded="false"
							className="dropdown-toggle"
						>
							<i className="fa fa-product-hunt"></i> Author
						</a>
						<ul className="collapse list-unstyled" id="categorySubmenu">
							<li>
								<Link to="/listAuthor">
									<i className="fa fa-clipboard"></i> All
								</Link>
							</li>

							<li>
								<Link to="/newAuthor">
									<i className="fa fa-plus"></i> Create
								</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/auth">
							<i className="fa fa-shopping-basket"></i> Call Card
						</Link>
					</li>

					<li>
						<Link to="/admin/users">
							<i className="fa fa-users"></i> Users
						</Link>
					</li>

					
				</ul>
			</nav>
		</div>
	);
};
export default Sidebar;
