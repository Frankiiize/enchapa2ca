import React from "react";
import '../../styles/components/loaders/skeletons.css'

const SkeletonProductGrid = ({sectionSkeletonClass}) => {
  return (
    <div className={sectionSkeletonClass}>
      {
        [1,2,3,4,5,6].map((element, index) => (
          <div key={index} className="Products__item-skeleton"></div>
        ))
      }
    </div>
  )
}

export { SkeletonProductGrid }; 