"use client"

import Image from "next/image";
import { useState } from "react";

import Card from "@/components/Card";

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
                        {gridView ?
                            <div className={styles.grid_item_image}>
                                <Image
                                    className={styles.grid_item_image}
                                    src={photo.urls.regular}
                                    alt={photo.alt_description}
                                    width={300}
                                    height={300}
                                    objectFit="cover"
                                    fill={false}
                                />
                                <div className={styles.likes}>
                                    <button className={styles.btn_like} disabled><i className="material-icons">favorite</i>
                                    </button>
                                    <div className={styles.height}>{photo.likes}</div>
                                </div>
                            </div>
                            :
                            <Card post={photo} />}
                    </div>
                )}
            </div>
        </div>
    )
}