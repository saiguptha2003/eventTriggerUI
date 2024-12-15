import React, { useState } from 'react';
import api from '../../services/api';

const CreateTrigger = () => {
    const [formData, setFormData] = useState({
        trigger_type: '',
        schedule_time: '',
        interval: '',
        is_recurring: false,
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        if (!formData.trigger_type) return 'Trigger type is required.';
        if (!formData.schedule_time) return 'Schedule time is required.';
        if (!formData.interval || isNaN(formData.interval)) return 'Interval is required and must be a number.';
        if (formData.interval <= 0) return 'Interval must be a positive number.';
        return null;
    };

    const handleSubmit = async (e) => {
        console.log('Authorization Header:', api.defaults.headers['Authorization']);

        e.preventDefault();
        setMessage('');
        const validationError = validateForm();
        if (validationError) {
            setMessage(`Validation Error: ${validationError}`);
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post('/trigger/create-trigger', formData);
            setMessage(`Success: ${response.data.message}`);
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                setMessage(`Error: ${error.response.data.message || 'Failed to create trigger.'}`);
            } else if (error.request) {
                // Request was made but no response received
                setMessage('Error: No response from server. Please check your connection.');
            } else {
                // Something happened while setting up the request
                setMessage(`Error: Unexpected issue: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Trigger</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Trigger Type:
                    <select name="trigger_type" value={formData.trigger_type} onChange={handleChange}>
                        <option value="" disabled>
                            Select Trigger Type
                        </option>
                        <option value="scheduled">Scheduled</option>
                        <option value="manual">Manual</option>
                    </select>
                </label>
                <label>
                    Schedule Time:
                    <input
                        name="schedule_time"
                        type="datetime-local"
                        value={formData.schedule_time}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Interval (mins):
                    <input
                        name="interval"
                        type="number"
                        placeholder="Interval (mins)"
                        value={formData.interval}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        name="is_recurring"
                        type="checkbox"
                        checked={formData.is_recurring}
                        onChange={(e) => setFormData({ ...formData, is_recurring: e.target.checked })}
                    />
                    Recurring
                </label>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateTrigger;
