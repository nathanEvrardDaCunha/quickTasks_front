import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import CreateTaskForm from './components/CreateTaskForm';
import CreateTaskStatusMessage from './components/CreateTaskStatusMessage';
import FetchTaskStatusMessage from './components/FetchTaskStatusMessage';
import useCreateTask from './hooks/useCreateTask';
import useFetchTask from './hooks/useFetchTask';
import FilterTasks from './components/FilterTasks';
import useFilterTask from './hooks/useFilterTask';
import useSortTask from './hooks/useSortTask';
import SortTasks from './components/SortTasks';
import Main from '../../layouts/Main';
import Button from '../../components/ui/Button';
import { useState } from 'react';
import Card from '../../components/ui/Card';
import { FiFilter, FiList, FiPlus } from 'react-icons/fi';
import './components/today.scss';

function Today() {
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [isSorterOpen, setIsSorterOpen] = useState<boolean>(false);
    const [isCreatorOpen, setIsCreatorOpen] = useState<boolean>(false);
    const { query } = useFetchTask();

    const {
        handleAction,
        handleOnChange,
        handleReset,
        mutation,
        createTaskData,
    } = useCreateTask(query);

    const {
        handleMaxDateChange,
        handleMinDateChange,
        handleOnFilterCompletedChange,
        handleOnFilterProjectChange,
        displayAllProject,
        maxDate,
        minDate,
        completedFilter,
        projectFilter,
    } = useFilterTask(query);

    const {
        handleDescriptionSortChange,
        handleTitleSortChange,
        handleProjectSortChange,
        handleDeadlineSortChange,
        descriptionSort,
        titleSort,
        projectSort,
        deadlineSort,
    } = useSortTask();

    // When the task has whitespace or 'undefined' as project, the filter display is ""

    return (
        <>
            <Header />

            <Main style={{ gap: 24 }} variant={'fluid'}>
                <div className="today-layout">
                    <div className="today-layout__controls">
                        {isFilterOpen ? (
                            <Card variant={'outline'} style={{ gap: 24 }}>
                                <FilterTasks
                                    handleOnFilterProjectChange={
                                        handleOnFilterProjectChange
                                    }
                                    displayAllProject={displayAllProject}
                                    handleOnFilterCompletedChange={
                                        handleOnFilterCompletedChange
                                    }
                                    minDate={minDate}
                                    handleMinDateChange={handleMinDateChange}
                                    maxDate={maxDate}
                                    handleMaxDateChange={handleMaxDateChange}
                                />

                                <Button
                                    type={'button'}
                                    variant={'default'}
                                    handleOnClick={() => setIsFilterOpen(false)}
                                >
                                    <span className="button-content">
                                        <FiFilter />
                                        Close filters
                                    </span>
                                </Button>
                            </Card>
                        ) : (
                            <Button
                                type={'button'}
                                variant={'default'}
                                handleOnClick={() => setIsFilterOpen(true)}
                            >
                                <span className="button-content">
                                    <FiFilter />
                                    Filter tasks
                                </span>
                            </Button>
                        )}

                        {isSorterOpen ? (
                            <Card variant={'outline'} style={{ gap: 24 }}>
                                <SortTasks
                                    deadlineSort={deadlineSort}
                                    handleDeadlineSortChange={
                                        handleDeadlineSortChange
                                    }
                                    projectSort={projectSort}
                                    handleProjectSortChange={
                                        handleProjectSortChange
                                    }
                                    titleSort={titleSort}
                                    handleTitleSortChange={
                                        handleTitleSortChange
                                    }
                                    descriptionSort={descriptionSort}
                                    handleDescriptionSortChange={
                                        handleDescriptionSortChange
                                    }
                                />

                                <Button
                                    type={'reset'}
                                    variant={'default'}
                                    handleOnClick={() => setIsSorterOpen(false)}
                                >
                                    <span className="button-content">
                                        <FiList />
                                        Close sorting
                                    </span>
                                </Button>
                            </Card>
                        ) : (
                            <Button
                                type={'reset'}
                                variant={'default'}
                                handleOnClick={() => setIsSorterOpen(true)}
                            >
                                <span className="button-content">
                                    <FiList />
                                    Sort tasks
                                </span>
                            </Button>
                        )}

                        {isCreatorOpen ? (
                            <Card variant={'outline'} style={{ gap: 24 }}>
                                <CreateTaskStatusMessage mutation={mutation} />

                                <CreateTaskForm
                                    handleAction={handleAction}
                                    handleOnChange={handleOnChange}
                                    handleReset={handleReset}
                                    mutation={mutation}
                                    createTaskData={createTaskData}
                                />

                                <Button
                                    type={'reset'}
                                    variant={'default'}
                                    handleOnClick={() =>
                                        setIsCreatorOpen(false)
                                    }
                                >
                                    <span className="button-content">
                                        <FiPlus />
                                        Close creator
                                    </span>
                                </Button>
                            </Card>
                        ) : (
                            <Button
                                type={'reset'}
                                variant={'default'}
                                handleOnClick={() => setIsCreatorOpen(true)}
                            >
                                <span className="button-content">
                                    <FiPlus />
                                    Add task
                                </span>
                            </Button>
                        )}
                    </div>

                    <div className="today-layout__content">
                        <FetchTaskStatusMessage
                            query={query}
                            project={projectFilter}
                            completed={completedFilter}
                            minDate={minDate}
                            maxDate={maxDate}
                            deadlineSort={deadlineSort}
                            projectSort={projectSort}
                            titleSort={titleSort}
                            descriptionSort={descriptionSort}
                        />
                    </div>
                </div>
            </Main>

            <Footer />
        </>
    );
}

export default Today;
