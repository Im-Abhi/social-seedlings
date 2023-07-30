"use client"

import Image from "next/image";
import { useState } from "react";

import styles from '../../../styles/ImageGrid.module.css';

export default function UserClient({ photos }) {

    const [gridView, setGridView] = useState(true);

    return (
        <div>
            <div className="">
                <button onClick={() => setGridView(true)}>Grid</button>
                <button onClick={() => setGridView(false)}>Single</button>
            </div>
            <div className={`${gridView ? styles.grid_view : styles.single_view}`}>
                {photos.map((photo, id) =>
                    <div className={''} key={id}>
                        <Image
                            className={styles.user_image}
                            src={photo.urls.regular}
                            width={200}
                            height={200}
                            alt=''
                        />
                        <p className=''>{photo.description}</p>
                        <p className={styles.post_likes}>likes = {photo.likes}</p>
                    </div>
                )}
            </div>
        </div>
    )
}