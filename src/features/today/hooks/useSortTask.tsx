import { useState } from 'react';

export default function useSortTask() {
    const [deadlineSort, setDeadlineSort] = useState<string>('default');
    const [projectSort, setProjectSort] = useState<string>('default');
    const [titleSort, setTitleSort] = useState<string>('default');
    const [descriptionSort, setDescriptionSort] = useState<string>('default');

    function handleDeadlineSortChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setDeadlineSort(event.target.value);
    }

    function handleProjectSortChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setProjectSort(event.target.value);
    }

    function handleTitleSortChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setTitleSort(event.target.value);
    }

    function handleDescriptionSortChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setDescriptionSort(event.target.value);
    }

    return {
        handleDescriptionSortChange,
        handleTitleSortChange,
        handleProjectSortChange,
        handleDeadlineSortChange,
        descriptionSort,
        titleSort,
        projectSort,
        deadlineSort,
    };
}
