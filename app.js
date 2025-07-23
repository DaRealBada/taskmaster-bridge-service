const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process'); // For running shell commands
const app = express();
const port = 8080;

app.use(bodyParser.json());

app.post('/create-task', (req, res) => {
  const prTitle = req.body.pr_title;
  const prUrl = req.body.pr_url;
  const testPlanSummary = req.body.test_plan_summary;

  console.log('--- Received New Task Request from n8n ---');
  console.log('PR Title:', prTitle);
  console.log('PR URL:', prUrl);
  console.log('Test Plan Summary (first 200 chars):', testPlanSummary ? testPlanSummary.substring(0, 200) + '...' : 'N/A');

  // --- CRITICAL: Construct the REAL command to call task-master-ai ---
  // As per your previous help output, task-master-ai is an MCP client.
  // You need to find out:
  // 1. What command or API call actually creates a task.
  // 2. How to configure task-master-ai (the client) to connect to its MCP Server
  //    (e.g., your context7 service, or an external Smithery AI service).
  //    This might involve environment variables, arguments, or a config file for task-master-ai.

  // Placeholder: Using 'task-master-ai init' for now as that's what we know runs.
  // You MUST replace this with the actual task creation logic!
  const taskCommand = `./node_modules/.bin/task-master-ai init`;
  console.log('Attempting to call task-master-ai with command:', taskCommand);

  exec(taskCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing task-master-ai: ${error.message}`);
      // If task-master-ai needs to connect to an MCP server, and it fails,
      // the error might be here.
      return res.status(500).json({ status: 'error', message: 'Failed to execute task-master-ai command', details: stderr || stdout });
    }
    console.log(`Task Master AI stdout: ${stdout}`);
    if (stderr) {
      console.error(`Task Master AI stderr: ${stderr}`);
    }
    res.status(200).json({ status: 'success', message: 'Task Master AI command executed', output: stdout });
  });
});

app.get('/', (req, res) => {
  res.status(200).send('Task Master Bridge Service is running!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Task Master Bridge Service (my-nodejs-app) running on http://0.0.0.0:${port}/`);
});