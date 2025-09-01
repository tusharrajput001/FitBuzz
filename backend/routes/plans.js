const express = require('express');
const router = express.Router();
const supabase = require('../db');
const authenticateToken = require('../middleware/auth');

// POST /api/plans - Create a new workout and diet plan
router.post('/', authenticateToken, async (req, res) => {
    try {
        console.log('POST /api/plans - Request received');
        console.log('Request body:', req.body);
        console.log('Request body type:', typeof req.body);
        console.log('Request headers:', req.headers);
        
        // Check Supabase connection
        console.log('Supabase client:', supabase);
        console.log('Supabase URL:', process.env.SUPABASE_URL);
        console.log('Supabase key exists:', !!process.env.SUPABASE_ANON_KEY);
        
        const { workout_plan, diet_plan } = req.body;
        const userId = req.user.id;

        console.log('Extracted workout_plan:', workout_plan);
        console.log('Extracted diet_plan:', diet_plan);
        console.log('User ID:', userId);

        if (!workout_plan || !diet_plan) {
            console.log('Validation failed - missing workout_plan or diet_plan');
            return res.status(400).json({ 
                error: 'Workout plan and diet plan are required',
                received: {
                    hasWorkoutPlan: !!workout_plan,
                    hasDietPlan: !!diet_plan,
                    bodyKeys: Object.keys(req.body || {})
                }
            });
        }

        // Start a transaction
        console.log('Attempting to create plan with user_id:', userId);
        
        const { data: plan, error: planError } = await supabase
            .from('plans')
            .insert({
                user_id: userId,
                name: 'Generated Plan',
                description: 'Custom Fitness Plan'
            })
            .select()
            .single();

        if (planError) {
            console.error('Error creating plan:', planError);
            console.error('Plan error details:', {
                message: planError.message,
                details: planError.details,
                hint: planError.hint,
                code: planError.code
            });
            return res.status(500).json({ 
                error: 'Failed to create plan',
                details: planError.message
            });
        }

        const planId = plan.id;
        console.log('Plan created successfully with ID:', planId);

        // Insert workout days and exercises
        console.log(`Processing ${workout_plan.length} workout days...`);
        for (let i = 0; i < workout_plan.length; i++) {
            const workoutDay = workout_plan[i];
            
            console.log(`Processing workout day ${i + 1}:`, JSON.stringify(workoutDay, null, 2));
            
            // Create workout day
            console.log(`Creating workout day ${i + 1} for plan ${planId}`);
            
            const { data: day, error: dayError } = await supabase
                .from('workout_days')
                .insert({
                    plan_id: planId,
                    day_number: i + 1,
                    day_name: workoutDay.day || `Day ${i + 1}`,
                    focus_area: 'General Fitness' // Default focus area since wizard doesn't provide this
                })
                .select()
                .single();

            if (dayError) {
                console.error('Error creating workout day:', dayError);
                console.error('Day error details:', {
                    message: dayError.message,
                    details: dayError.details,
                    hint: dayError.hint,
                    code: dayError.code
                });
                continue;
            }

            console.log(`Workout day ${i + 1} created with ID:`, day.id);

            // Insert exercises for this day
            console.log(`Workout day ${i + 1} exercises:`, workoutDay.exercises);
            console.log(`Exercises array length:`, workoutDay.exercises?.length);
            
            if (workoutDay.exercises && workoutDay.exercises.length > 0) {
                const exercises = workoutDay.exercises.map(exercise => {
                    console.log(`Processing exercise:`, exercise);
                    
                    // Handle different types of reps (numeric vs string)
                    let repsValue = exercise.reps || 10;
                    let durationSeconds = null;
                    
                    // If reps is a string (like "5 minutes"), convert to duration
                    if (typeof repsValue === 'string') {
                        if (repsValue.includes('minute')) {
                            const minutes = parseInt(repsValue.match(/\d+/)[0]);
                            durationSeconds = minutes * 60;
                            repsValue = 1; // Set reps to 1 for time-based exercises
                        } else if (repsValue.includes('second')) {
                            const seconds = parseInt(repsValue.match(/\d+/)[0]);
                            durationSeconds = seconds;
                            repsValue = 1; // Set reps to 1 for time-based exercises
                        }
                    }
                    
                    return {
                        workout_day_id: day.id,
                        exercise_name: exercise.name,
                        sets: exercise.sets || 3,
                        reps: repsValue,
                        duration_seconds: durationSeconds,
                        rest_seconds: 60
                    };
                });

                console.log(`Creating ${exercises.length} exercises for workout day ${day.id}:`, exercises);
                
                const { error: exercisesError } = await supabase
                    .from('workout_exercises')
                    .insert(exercises);

                if (exercisesError) {
                    console.error('Error creating exercises:', exercisesError);
                    console.error('Exercises error details:', {
                        message: exercisesError.message,
                        details: exercisesError.details,
                        hint: exercisesError.hint,
                        code: exercisesError.code
                    });
                } else {
                    console.log(`Successfully created ${exercises.length} exercises for day ${day.id}`);
                }
            } else {
                console.log(`No exercises found for workout day ${i + 1}`);
            }
        }

        // Insert meals and meal items
        console.log(`Processing ${diet_plan.length} meals...`);
        console.log(`Diet plan structure:`, JSON.stringify(diet_plan, null, 2));
        
        // diet_plan is directly an array of meals, not diet days
        for (let i = 0; i < diet_plan.length; i++) {
            const meal = diet_plan[i];
            console.log(`Processing meal ${i + 1}:`, JSON.stringify(meal, null, 2));
            
            // Create meal
            console.log(`Creating meal: ${meal.meal} for plan ${planId}`);
            
            const { data: mealData, error: mealError } = await supabase
                .from('meals')
                .insert({
                    plan_id: planId,
                    meal_type: meal.meal // Keep original case as it's more readable
                })
                .select()
                .single();

            if (mealError) {
                console.error('Error creating meal:', mealError);
                console.error('Meal error details:', {
                    message: mealError.message,
                    details: mealError.details,
                    hint: mealError.hint,
                    code: mealError.code
                });
                continue;
            }

            console.log(`Meal created with ID:`, mealData.id);

            // Insert meal items
            console.log(`Meal items for ${meal.meal}:`, meal.items);
            
            if (meal.items && meal.items.length > 0) {
                const mealItems = meal.items.map(item => {
                    console.log(`Processing meal item:`, item);
                    return {
                        meal_id: mealData.id,
                        food_name: item.food,
                        calories: item.calories || 0,
                        quantity: 1,
                        unit: 'serving'
                    };
                });

                console.log(`Creating ${mealItems.length} meal items for meal ${mealData.id}:`, mealItems);
                
                const { error: itemsError } = await supabase
                    .from('meal_items')
                    .insert(mealItems);

                if (itemsError) {
                    console.error('Error creating meal items:', itemsError);
                    console.error('Meal items error details:', {
                        message: itemsError.message,
                        details: itemsError.details,
                        hint: itemsError.hint,
                        code: itemsError.code
                    });
                } else {
                    console.log(`Successfully created ${mealItems.length} meal items for meal ${mealData.id}`);
                }
            } else {
                console.log(`No meal items found for meal ${meal.meal}`);
            }
        }

        res.status(201).json({
            message: 'Plan created successfully',
            plan_id: planId
        });

    } catch (error) {
        console.error('Error creating plan:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/plans - Get all plans for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const { data: plans, error } = await supabase
            .from('plans')
            .select(`
                *,
                workout_days (
                    *,
                    workout_exercises (*)
                ),
                meals (
                    *,
                    meal_items (*)
                )
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching plans:', error);
            return res.status(500).json({ error: 'Failed to fetch plans' });
        }

        res.json(plans);
    } catch (error) {
        console.error('Error fetching plans:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/plans/:id - Get a specific plan by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const { data: plan, error } = await supabase
            .from('plans')
            .select(`
                *,
                workout_days (
                    *,
                    workout_exercises (*)
                ),
                meals (
                    *,
                    meal_items (*)
                )
            `)
            .eq('id', id)
            .eq('user_id', userId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({ error: 'Plan not found' });
            }
            console.error('Error fetching plan:', error);
            return res.status(500).json({ error: 'Failed to fetch plan' });
        }

        res.json(plan);
    } catch (error) {
        console.error('Error fetching plan:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /api/plans/:id - Delete a plan
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Verify the plan belongs to the user
        const { data: plan, error: planError } = await supabase
            .from('plans')
            .select('id')
            .eq('id', id)
            .eq('user_id', userId)
            .single();

        if (planError || !plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        // Delete the plan (cascade will handle related records)
        const { error: deleteError } = await supabase
            .from('plans')
            .delete()
            .eq('id', id);

        if (deleteError) {
            console.error('Error deleting plan:', deleteError);
            return res.status(500).json({ error: 'Failed to delete plan' });
        }

        res.json({ message: 'Plan deleted successfully' });
    } catch (error) {
        console.error('Error deleting plan:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
