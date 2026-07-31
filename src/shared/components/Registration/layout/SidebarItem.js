import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const ROW_HEIGHT = 44;
const CHECK_MARK_ICON = "tabler:check";
const CHECK_COLOR = "text-[#22C55E]"; // green
const CHECK_BORDER = "border-[6px] border-[#22C55E] bg-white";
const CHECK_BORDERS = "border-[5px] border-[#22C55E] bg-white"; // white bg, thicker green border ring

const SidebarItem = ({
  section,
  activeKey,
  onSelect,
  isLast,
  completedKeys = [], // array/Set of keys that already have a value
  unlockedKeys = new Set(), // keys that are currently reachable/clickable
}) => {
  const hasChildren =
    Array.isArray(section.children) && section.children.length > 0;

  // A section with children is reachable as soon as at least one of its
  // children is unlocked; a childless section (e.g. "Review & Complete")
  // is reachable when its own key is unlocked.
  const isParentUnlocked = hasChildren
    ? section.children.some((c) => unlockedKeys.has(c.key))
    : unlockedKeys.has(section.key);

  const isParentActive =
    activeKey === section.key ||
    (hasChildren && section.children.some((c) => c.key === activeKey));


  const isSectionCompleted = hasChildren
    ? section.children.every((c) => completedKeys.includes(c.key))
    : completedKeys.includes(section.key);

  const [expanded, setExpanded] = useState(isParentActive && !isSectionCompleted);

 
  useEffect(() => {
    if (isSectionCompleted) {
      setExpanded(false);
    }
  }, [isSectionCompleted]);

  const wasParentActive = useRef(isParentActive);
  useEffect(() => {
    if (isParentActive && !wasParentActive.current && !isSectionCompleted) {
      setExpanded(true);
    }
    wasParentActive.current = isParentActive;
  }, [isParentActive, isSectionCompleted]);

  const handleParentClick = () => {
    if (!isParentUnlocked) return;
    if (hasChildren) {
      setExpanded((prev) => !prev);
    } else {
      onSelect(section.key);
    }
  };

  const activeChildIndex = hasChildren
    ? section.children.findIndex((c) => c.key === activeKey)
    : -1;

  // How far down the teal progress line should reach: whichever is further,
  // the currently active child or the last completed child. This keeps the
  // line visible even after activeKey has moved on to a different section.
  const highestCompletedChildIndex = hasChildren
    ? section.children.reduce(
        (highest, c, i) =>
          completedKeys.includes(c.key) ? Math.max(highest, i) : highest,
        -1,
      )
    : -1;
  const progressChildIndex = Math.max(activeChildIndex, highestCompletedChildIndex);

  // Completed always wins over active: once every child has data, this
  // parent shows the green check even if you re-open it to edit.
  const showParentCheck = isSectionCompleted;
  const showParentActiveStyle = isParentActive && !isSectionCompleted;

  return (
    <div className={`relative ${expanded ? "" : "pb-10"}`}>
      {/* Connector: green once this section is fully completed, gray otherwise */}
      {(hasChildren && expanded) || !isLast ? (
        <div
          className={`absolute left-5.5 top-12 w-0.5 z-0 ${
            isSectionCompleted ? "bg-[#22C55E]" : "bg-[#E6E6E6]"
          }`}
          style={{
            height:
              hasChildren && expanded
                ? `${section.children.length * ROW_HEIGHT + 16}px`
                : "40px",
          }}
        />
      ) : null}

      {/* Parent */}
      <div
        onClick={handleParentClick}
        className={`flex items-center justify-between rounded-lg p-2 transition-colors w-full min-w-0 ${
          isParentUnlocked ? "cursor-pointer" : "cursor-not-allowed"
        } ${isParentActive ? "bg-[#E3F6F5]" : isParentUnlocked ? "hover:bg-slate-50" : ""}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 flex items-center justify-center ${
              showParentCheck ? "rounded-full" : "rounded-sm"
            } ${
              showParentActiveStyle
                ? "bg-[#248B8F] text-white"
                : showParentCheck
                ? CHECK_BORDER
                : ""
            }`}
          >
            <Icon
              icon={showParentCheck ? CHECK_MARK_ICON : section.icon}
              width={showParentCheck ? 16 : 20}
              height={showParentCheck ? 16 : 20}
              strokeWidth={showParentCheck ? 9 : 4}
              className={`${
                showParentActiveStyle
                  ? "text-white"
                  : showParentCheck
                  ? CHECK_COLOR
                  : "text-[#A2AAB2]"
              }`}
            />
          </div>

          <span
            className={`text-sm font-medium ${
              isParentActive ? "text-primary-dark" : "text-[#A3AAB2]"
            }`}
          >
            {section.label}
          </span>
        </div>

        {hasChildren && (
          <Icon
            icon="tabler:circle-chevron-down"
            width="16"
            height="16"
            className={`transition-transform ${
              expanded ? "rotate-180" : ""
            } ${isParentActive ? "text-[#1D7275]" : "text-neutral-400"}`}
          />
        )}
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div className="relative ml-5.5 mt-4">
          {/* Progress line: green once the whole section is completed, teal while still in progress */}
          {progressChildIndex >= 0 && (
            <div
              className={`absolute left-0 -top-4 w-0.5 z-10 ${
                isSectionCompleted ? "bg-[#22C55E]" : "bg-[#248B8F]"
              }`}
              style={{
                height: `${(progressChildIndex + 1) * ROW_HEIGHT}px`,
              }}
            />
          )}

          {section.children.map((child) => {
            const isActive = activeKey === child.key;
            const isChildCompleted = completedKeys.includes(child.key);
            const isChildUnlocked = unlockedKeys.has(child.key);
            // Completed always wins over active, same as the parent: once a
            // child has data, re-opening it to edit still shows the green
            // check instead of switching back to the teal "active" circle.
            const showChildCheck = isChildCompleted;
            const showChildActiveStyle = isActive && !isChildCompleted;

            return (
              <div
                key={child.key}
                onClick={() => isChildUnlocked && onSelect(child.key)}
                className={`relative flex items-center gap-3 px-4 ${
                  isChildUnlocked ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                style={{ height: `${ROW_HEIGHT}px` }}
              >
                <div
                  className={`relative z-10 flex items-center justify-center rounded-full w-6 h-6 shrink-0 ${
                    showChildActiveStyle
                      ? "bg-[#248B8F] text-white"
                      : showChildCheck
                      ? CHECK_BORDERS
                      : isChildUnlocked
                      ? "text-slate-300"
                      : "text-slate-200"
                  }`}
                >
                  <Icon
                    icon={showChildCheck ? CHECK_MARK_ICON : child.icon}
                    width={showChildCheck ? 11 : 16}
                    height={showChildCheck ? 11 : 16}
                    strokeWidth={showChildCheck ? 6 : 2}
                    className={showChildCheck ? CHECK_COLOR : ""}
                  />
                </div>

                <div className="flex items-center justify-between flex-1 min-w-0 gap-2">
                  <span
                    className={`text-xs whitespace-nowrap ${
                      isActive
                        ? "font-medium text-[#202020]"
                        : isChildCompleted
                        ? "text-[#202020]"
                        : isChildUnlocked
                        ? "text-slate-400"
                        : "text-slate-300"
                    }`}
                  >
                    {child.label}
                  </span>

                  {child.optional && (
                    <span className="text-[9px] font-medium text-text-muted bg-disabled-bg px-2 py-1 rounded-full shrink-0">
                      Optional
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;