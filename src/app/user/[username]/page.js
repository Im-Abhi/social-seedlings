import Image from "next/image";

import styles from '../../../styles/ImageGrid.module.css';
import UserClient from "./userClient";

const BASE_URL = "https://api.unsplash.com/users/";
const clientId = "vtgpr3skeVpaKyMaGYacZs_bd12N9fwd1P3w9ep0i4c";

async function getUserInfo(username) {
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
}


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
    const userData = await getUserInfo(username);
    const photos = await getUserPhotos(username);

    return (
        <div>
            <div className="">
                <h1>User Profile Section</h1>
                <Image
                    className={styles.user_image}
                    src={userData.profile_image.small}
                    width={50}
                    height={50}
                    alt=''
                />
                <h6 className={''}>{userData.name}</h6>
                <p className={''}>{userData.bio}</p>
                <p className={''}>{userData.location}</p>
                <UserClient photos={photos}>
                </UserClient>
            </div>
        </div>
    )
}