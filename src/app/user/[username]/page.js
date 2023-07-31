import { cache } from 'react';
import Image from "next/image";
import 'server-only'

import UserClient from "./userClient";

import styles from '../../../styles/ImageGrid.module.css';
import Link from "next/link";

const BASE_URL = "https://api.unsplash.com/users/";
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

export const preload = (username) => {
    return getUserInfo(username);
}

export const getUserInfo = cache(async (username) => {
    const res = await fetch(`${BASE_URL}${username}`, {
        headers: {
            Authorization: `Client-ID ${clientId}`
        }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();
    return data;
});

async function getUserPhotos(username) {
    const res = await fetch(`${BASE_URL}${username}/photos`, {
        headers: {
            Authorization: `Client-ID ${clientId}`
        }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json();
    return data;
}

export default async function Page({ params }) {
    const { username } = params;
    const photos = await getUserPhotos(username);
    const userData = await preload(username);

    return (
        <div>
            <div className={styles.hero}>
                <Image
                    className={styles.user_image}
                    src={userData.profile_image.small}
                    width={75}
                    height={75}
                    alt=''
                />
            </div>
            <div className={styles.user_info}>
                <h3 className={''}>{userData.name}</h3>
                <p className={styles.user_bio}>{userData.bio}</p>
                {userData.location &&
                    <p className={styles.user_loc}>
                        <span className="material-icons">
                            location_on
                        </span>
                        {userData.location}
                    </p>
                }
                {userData.portfolio_url &&
                    <p className={styles.user_link}>
                        <span className="material-icons">
                            link
                        </span>
                        <Link href={userData.portfolio_url}>
                            {userData.portfolio_url}
                        </Link>
                    </p>
                }
            </div>
            <UserClient photos={photos} />
        </div>
    )
}