"use client"

import Image from "next/image";
import { Fragment, useState } from "react";

import Card from "@/components/Card";

import styles from '../../../styles/ImageGrid.module.css';

export default function UserClient({ photos }) {

    const [gridView, setGridView] = useState(true);

    return (
        <div>
            <div className={styles.change_view}>
                <button onClick={() => setGridView(true)}>
                    <span className="material-icons">
                        grid_on
                    </span>
                </button>
                <button onClick={() => setGridView(false)}>
                    <span className="material-icons">
                        view_list
                    </span>
                </button>
            </div>
            <div className={`${gridView ? styles.grid_view : styles.single_view}`}>
                {photos.map((photo, id) =>
                    <Fragment key={id}>
                        {gridView ?
                            <div className={styles.grid_item_image}>
                                <Image
                                    className={styles.grid_item_image}
                                    src={photo.urls.raw}
                                    placeholder="blur"
                                    blurDataURL={photo.blur_hash}
                                    alt={photo.alt_description}
                                    width={110}
                                    height={110}
                                    quality={100}
                                />
                                <div className={styles.likes}>
                                    <button className={styles.btn_like} disabled><i className="material-icons">favorite</i>
                                    </button>
                                    <div className={styles.height}>{photo.likes}</div>
                                </div>
                            </div>
                            :
                            <Card post={photo} />}
                    </Fragment>
                )}
            </div>
        </div>
    )
}