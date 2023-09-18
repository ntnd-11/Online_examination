import { Box, Button, FormControl, FormLabel, Icon, Input, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FaCloudUploadAlt, FaFileAlt, FaFileDownload } from 'react-icons/fa';
import StudentAdminService from '../../services/StudentAdminService';
import ApiStatus from '../../constants/ApiStatus';
import { useNavigate } from 'react-router-dom';
import AdminService from '../../services/AdminService';

function ImportStudentFile() {
    const [file, setFile] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDownload, setIsLoadingDownload] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleUploadFile = () => {
        setIsLoading(true);
        StudentAdminService.import(file)
            .then((response) => {
                setIsLoading(false);
                if (response.status !== ApiStatus.SUCCESS) {
                    toast({
                        title: response.message,
                        status: 'error',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: response.message,
                        status: 'success',
                        position: 'bottom',
                        duration: 5000,
                        isClosable: true,
                    });
                    navigate('/admin/student-management');
                }
            })
            .catch((err) => {
                setIsLoading(false);
                toast({
                    title: err.message,
                    status: 'error',
                    position: 'bottom',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    const handleDownLoadTemplate = () => {
        setIsLoadingDownload(true);
        AdminService.downloadImportStudentTemplate()
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'import-students-template.xlsx');
                document.body.appendChild(link);
                link.click();
                setIsLoadingDownload(false);
            })
            .catch((err) => {
                setIsLoadingDownload(false);
                toast({
                    title: err.message,
                    status: 'error',
                    position: 'bottom',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    return (
        <Box bg={'white'} mr={4} borderRadius={5} pt={4} pb={4} pl={4} pr={4} overflow={'auto'}>
            <Box marginBottom={4}>
                <Text fontSize={20} fontWeight={500} mb={4}>
                    Quản lý sinh viên
                </Text>
                <Box>
                    <Button
                        bgColor={'#54a1e4'}
                        color={'white'}
                        _hover={{ opacity: 0.9 }}
                        onClick={handleDownLoadTemplate}
                        isLoading={isLoadingDownload}
                    >
                        <Icon as={FaFileDownload} mr={2} />
                        <Text>Tải xuống mẫu file</Text>
                    </Button>
                    <FormControl mr={8} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <FormLabel
                            display={'flex'}
                            alignItems="center"
                            borderWidth={2}
                            padding={2}
                            borderRadius={5}
                            _hover={{ cursor: 'pointer' }}
                        >
                            <Icon as={FaCloudUploadAlt} mr={2} />
                            Tải lên file sinh viên tại đây
                        </FormLabel>
                        <Input
                            onChange={(e) => setFile(e.target.files[0])}
                            type={'file'}
                            aria-hidden="true"
                            display={'none'}
                        />
                    </FormControl>
                    {file && (
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Icon as={FaFileAlt} mr={2} />
                            <Text>{file.name}</Text>
                        </Box>
                    )}
                </Box>
                <Box mt={4} display={'flex'} justifyContent={'center'}>
                    <Button
                        backgroundColor={'#54A1E4'}
                        color={'white'}
                        onClick={handleUploadFile}
                        isLoading={isLoading}
                    >
                        <Text>Tải lên</Text>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default ImportStudentFile;
