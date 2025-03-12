import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function index() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(false); 
    const [index, setIndex] = useState(0);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://random-data-api.com/api/users/random_user?size=80');
            setUsers(response.data);
            setUser(response.data[0]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (index < users.length - 1) {
            setPageLoading(true); 
            setTimeout(() => {
                setIndex(index + 1);
                setUser(users[index + 1]);
                setPageLoading(false); 
            }, 1000); 
        }
    };

    const handlePrevious = () => {
        if (index > 0) {
            setPageLoading(true); 
            setTimeout(() => {
                setIndex(index - 1);
                setUser(users[index - 1]);
                setPageLoading(false); 
            }, 1000); 
        }
    };

    if (loading) {
        return (
            <View style={styles.skeletonContainer}>
                <View style={styles.skeletonAvatar} />
                <View style={styles.skeletonText} />
                <View style={styles.skeletonText} />
                <View style={styles.skeletonText} />
                <View style={styles.skeletonText} />
                <View style={styles.skeletonText} />
                <View style={styles.skeletonText} />
                <View style={styles.skeletonText} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {pageLoading ? (
                <View style={styles.profileCard}>
                    <View style={styles.skeletonAvatar} />
                    <View style={styles.skeletonText} />
                    <View style={styles.skeletonText} />
                    <View style={styles.skeletonText} />
                    <View style={styles.skeletonText} />
                    <View style={styles.skeletonText} />
                    <View style={styles.skeletonText} />
                    <View style={styles.skeletonText} />
                </View>
            ) : (
                user && (
                    <>
                        <View style={styles.profileCard}>
                            <View style={{position:'absolute',right:10}}>
                                <Text style={{fontSize:28}}>{index + 1} / {users.length}</Text>
                            </View>
                            <Image source={{ uri: user.avatar }} style={styles.avatar} />
                            <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
                            <Text style={styles.username}>@{user.username}</Text>
                            <View style={styles.infoContainer}>
                                <Text style={styles.text}><Text style={styles.label}>ID:</Text> {user.id}</Text>
                                <Text style={styles.text}><Text style={styles.label}>UID:</Text> {user.uid}</Text>
                                <Text style={styles.text}><Text style={styles.label}>Password:</Text> {user.password}</Text>
                                <Text style={styles.text}><Text style={styles.label}>Email:</Text> {user.email}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.outlineButton, index === 0 && styles.disabledButton]}
                                onPress={handlePrevious}
                                disabled={index === 0 || pageLoading}
                            >
                                <Text style={styles.outlineButtonText}>Previous</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.filledButton, index === users.length - 1 && styles.disabledButton]}
                                onPress={handleNext}
                                disabled={index === users.length - 1 || pageLoading}
                            >
                                <Text style={styles.filledButtonText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f0f8ff',
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 14,
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 6,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#000',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    username: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    infoContainer: {
        width: '100%',
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    label: {
        fontWeight: 'bold',
        color: '#000',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 15,
    },
    outlineButton: {
        borderWidth: 2,
        borderColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filledButton: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
        borderColor: '#cccccc',
    },
    outlineButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    filledButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    skeletonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    skeletonAvatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#e0e0e0',
        marginBottom: 15,
    },
    skeletonText: {
        width: '80%',
        height: 16,
        backgroundColor: '#e0e0e0',
        marginBottom: 10,
        borderRadius: 4,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
});
