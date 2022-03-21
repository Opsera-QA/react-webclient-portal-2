import React from "react";
import PropTypes from "prop-types";
import FiltersBadgeBase from "components/common/badges/tag/FiltersBadgeBase";
import SpyglassBadge from "components/common/badges/spyglass/SpyglassBadge";
import { hasStringValue } from "components/common/helpers/string-helpers";
import AppliedOrganizationsOverlay from "components/common/fields/multiple_items/tags/AppliedOrganizationsOverlay";

function AppliedFiltersBadge({ tags, tagLocation, className, showNoTagsAppliedBadge }) {
  const getTagLabel = () => {
    let tagText = `${tags?.length} `;

    if (hasStringValue(tagLocation) === true) {
      tagText += `${tagLocation} `;
    }

    return tagText + (tags?.length !== 1 ? "Filters Applied" : "Filter Applied");
  };

  if (!Array.isArray(tags) || tags.length === 0) {
    if (showNoTagsAppliedBadge === true) {
      return (
        <div className={className}>
          <FiltersBadgeBase
            className={"metric-badge"}
            badgeText={`No ${tagLocation ? `${tagLocation} ` : ""}Filters Applied`}
          />
        </div>
      );
    }

    return null;
  }

  return (
    <AppliedOrganizationsOverlay className={className} tags={tags}>
      <SpyglassBadge className={"metric-badge"} badgeText={getTagLabel()} />
    </AppliedOrganizationsOverlay>
  );
}

AppliedFiltersBadge.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
  showNoTagsAppliedBadge: PropTypes.bool,
  tagLocation: PropTypes.string,
};

export default AppliedFiltersBadge;
