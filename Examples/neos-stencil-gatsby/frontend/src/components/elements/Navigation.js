import React from "react";
import styled from "styled-components";

const StyledNavigation = styled.nav`
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	a {
		display: flex;
		align-items: center;
		height: 48px;
		padding: 0 2em;
		border-bottom: 1px solid #ccc;
		color: black;
		text-decoration: none;

		&:hover {
			background-color: #eee;
			text-decoration: none;
		}
	}
`;

export default function Navigation(props) {
	return (
		<StyledNavigation>
			<ul>
				{props.items.map(item => (
					<li>
						<a
							href={item.href}
							target={item.target}
							rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
							>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</StyledNavigation>
	)
}
