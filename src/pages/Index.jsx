import React, { useState } from "react";
import { Box, Heading, Text, VStack, HStack, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Progress, useToast } from "@chakra-ui/react";
import { FaBookmark, FaPlay, FaClock } from "react-icons/fa";

const problems = [
  {
    id: 1,
    topic: "Algebra",
    difficulty: "Easy",
    question: "Solve for x: 2x + 5 = 15",
    answer: "x = 5",
    explanation: "To solve for x, subtract 5 from both sides of the equation: 2x = 10. Then, divide both sides by 2 to get x = 5.",
  },
  // Add more problems here
];

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  const handleBookmark = (problemId) => {
    if (bookmarks.includes(problemId)) {
      setBookmarks(bookmarks.filter((id) => id !== problemId));
    } else {
      setBookmarks([...bookmarks, problemId]);
    }
  };

  const handleQuizSubmit = () => {
    // Implement quiz submission logic here
    setProgress(progress + 10);
    toast({
      title: "Quiz submitted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="800px" margin="auto" p={8}>
      <Heading as="h1" size="2xl" mb={8} color="blue.500">
        Math Problem Bank
      </Heading>
      <Tabs isFitted variant="enclosed" onChange={(index) => setActiveTab(index)}>
        <TabList>
          <Tab>Practice</Tab>
          <Tab>Quiz</Tab>
          <Tab>Bookmarks</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Accordion allowMultiple>
              {problems.map((problem) => (
                <AccordionItem key={problem.id}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {problem.topic} - {problem.difficulty}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text mb={2}>{problem.question}</Text>
                    <Text fontWeight="bold" mb={2}>
                      Answer: {problem.answer}
                    </Text>
                    <Text>{problem.explanation}</Text>
                    <Button leftIcon={<FaBookmark />} size="sm" mt={4} colorScheme={bookmarks.includes(problem.id) ? "blue" : "gray"} onClick={() => handleBookmark(problem.id)}>
                      {bookmarks.includes(problem.id) ? "Bookmarked" : "Bookmark"}
                    </Button>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </TabPanel>
          <TabPanel>
            <VStack spacing={8} align="stretch">
              {problems.map((problem) => (
                <Box key={problem.id} p={4} borderWidth={1} borderRadius="md">
                  <Text mb={2}>{problem.question}</Text>
                  {/* Add quiz answer input and submission */}
                </Box>
              ))}
              <Button leftIcon={<FaPlay />} colorScheme="blue" onClick={handleQuizSubmit}>
                Submit Quiz
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={8} align="stretch">
              {bookmarks.map((problemId) => {
                const problem = problems.find((p) => p.id === problemId);
                return (
                  <Box key={problem.id} p={4} borderWidth={1} borderRadius="md">
                    <Text mb={2}>{problem.question}</Text>
                    <Text fontWeight="bold" mb={2}>
                      Answer: {problem.answer}
                    </Text>
                    <Text>{problem.explanation}</Text>
                  </Box>
                );
              })}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <HStack mt={8} justify="space-between">
        <Text>Progress: {progress}%</Text>
        <Button leftIcon={<FaClock />} colorScheme="blue">
          Timed Session
        </Button>
      </HStack>
      <Progress value={progress} colorScheme="blue" mt={4} />
    </Box>
  );
};

export default Index;
