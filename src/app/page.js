"use client"

import { useState, useEffect, useRef, useCallback } from 'react';

import Loading from './loading';
import { Container, ImageGrid } from '../components';

const BASE_URL = "https://api.unsplash.com/photos?";
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

export default function Home() {
	const [pageData, setPageData] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [page, setPage] = useState(1);

	// observer
	const observer = useRef();
	const lastElement = useCallback((node) => {
		if (isLoading) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					//get first entrie of target element
					setPage((prevPage) => prevPage + 1);
				}
			},
			{ threshold: 1 }
		);
		// observe current node
		if (node) observer.current.observe(node);
	}, [isLoading]);

	async function fetchData(page) {
		try {
			setLoading(true);
			const response = await fetch(`${BASE_URL}page=${page}`, {
				headers: {
					Authorization: `Client-ID ${clientId}`
				}
			});
			const data = await response.json();
			setPageData((prevData) => [...prevData, ...data]);
			setLoading(false);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchData(page);
	}, [page]);

	return (
		<Container>
			{isLoading ? <Loading /> :
				pageData.length > 0 && (
					<ImageGrid
						pageData={pageData}
						lastElementRef={lastElement}
					/>
				)
			}
		</Container>
	);
}
