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
import Heading from '../../components/ui/Heading';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import { useState } from 'react';
import Card from '../../components/ui/Card';

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
                {isFilterOpen === true ? (
                    <Section variant={'column'} style={{ gap: 8 }}>
                        <Section variant={'column'}>
                            <Heading variant={'h2'} markup={'h2'}>
                                Filters
                            </Heading>

                            <Heading variant={'h4'} markup={'h3'}>
                                Filter your tasks.
                            </Heading>
                        </Section>

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
                                handleOnClick={() =>
                                    setIsFilterOpen((previous) => !previous)
                                }
                            >
                                Close filters
                            </Button>
                        </Card>
                    </Section>
                ) : (
                    <Section variant={'column'} style={{ gap: 8 }}>
                        <Section variant={'column'}>
                            <Heading variant={'h2'} markup={'h2'}>
                                Filters
                            </Heading>

                            <Heading variant={'h4'} markup={'h3'}>
                                Filter your tasks.
                            </Heading>
                        </Section>

                        <Button
                            type={'button'}
                            variant={'default'}
                            handleOnClick={() =>
                                setIsFilterOpen((previous) => !previous)
                            }
                        >
                            Open filters
                        </Button>
                    </Section>
                )}

                {isSorterOpen === true ? (
                    <Section variant={'column'} style={{ gap: 8 }}>
                        <Section variant={'column'}>
                            <Heading variant={'h2'} markup={'h2'}>
                                Sort
                            </Heading>

                            <Heading variant={'h4'} markup={'h3'}>
                                Sort your tasks.
                            </Heading>
                        </Section>

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
                                handleTitleSortChange={handleTitleSortChange}
                                descriptionSort={descriptionSort}
                                handleDescriptionSortChange={
                                    handleDescriptionSortChange
                                }
                            />

                            <Button
                                type={'reset'}
                                variant={'default'}
                                handleOnClick={() =>
                                    setIsSorterOpen((previous) => !previous)
                                }
                            >
                                Close sorters
                            </Button>
                        </Card>
                    </Section>
                ) : (
                    <Section variant={'column'} style={{ gap: 8 }}>
                        <Section variant={'column'}>
                            <Heading variant={'h2'} markup={'h2'}>
                                Sort
                            </Heading>

                            <Heading variant={'h4'} markup={'h3'}>
                                Sort your tasks.
                            </Heading>
                        </Section>

                        <Button
                            type={'reset'}
                            variant={'default'}
                            handleOnClick={() =>
                                setIsSorterOpen((previous) => !previous)
                            }
                        >
                            Open sorters
                        </Button>
                    </Section>
                )}

                {isCreatorOpen === true ? (
                    <Section variant={'column'} style={{ gap: 8 }}>
                        <Section variant={'column'}>
                            <Heading variant={'h2'} markup={'h2'}>
                                Create Task
                            </Heading>

                            <Heading variant={'h4'} markup={'h3'}>
                                Create, update and delete your tasks freely.
                            </Heading>
                        </Section>

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
                                    setIsCreatorOpen((previous) => !previous)
                                }
                            >
                                Close creator
                            </Button>
                        </Card>
                    </Section>
                ) : (
                    <Section variant={'column'} style={{ gap: 8 }}>
                        <Section variant={'column'}>
                            <Heading variant={'h2'} markup={'h2'}>
                                Create Task
                            </Heading>

                            <Heading variant={'h4'} markup={'h3'}>
                                Create, update and delete your tasks freely.
                            </Heading>
                        </Section>

                        <Button
                            type={'reset'}
                            variant={'default'}
                            handleOnClick={() =>
                                setIsCreatorOpen((previous) => !previous)
                            }
                        >
                            Open creator
                        </Button>
                    </Section>
                )}

                <Section variant={'column'} style={{ gap: 24 }}>
                    <Section variant={'column'}>
                        <Heading variant={'h2'} markup={'h2'}>
                            Display Task
                        </Heading>

                        <Heading variant={'h4'} markup={'h3'}>
                            Tasks based on filters and sorters.
                        </Heading>
                    </Section>

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
                </Section>
            </Main>

            <Footer />
        </>
    );
}

export default Today;
