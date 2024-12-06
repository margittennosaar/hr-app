export const getDepartmentClass = (dept) => {
    if (!dept) return "default";

    const lowerCaseDepartment = dept.toLowerCase();

    switch (lowerCaseDepartment) {
        case "web development":
            return "web";
        case "game development":
            return "game";
        default:
            return "default";
    }
};