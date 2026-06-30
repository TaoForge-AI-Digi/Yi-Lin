#!/bin/bash
# Multi-Agent System Setup Script
# Creates a new specialized agent with proper directory structure and configuration

set -e

# Function to display usage
usage() {
    echo "Usage: $0 <agent-name> <agent-domain> [description]"
    echo "Example: $0 marketing-agent 'digital marketing campaigns'"
    exit 1
}

# Check if agent name is provided
if [ -z "$1" ]; then
    usage
fi

AGENT_NAME="$1"
AGENT_DOMAIN="$2"
AGENT_DESCRIPTION="${3:-Specialized agent for $2 tasks}"

# Create directory structure
echo "Creating agent directory structure for $AGENT_NAME..."
mkdir -p "$AGENT_NAME"/{workflows,templates,data,scripts,references}

# Create main configuration file
cat > "$AGENT_NAME/agent-config.yaml" << EOF
name: $AGENT_NAME
description: $AGENT_DESCRIPTION
version: 1.0.0

# Core responsibilities
responsibilities:
  - Domain-specific task 1 for $AGENT_DOMAIN
  - Domain-specific task 2 for $AGENT_DOMAIN
  - Domain-specific task 3 for $AGENT_DOMAIN

# Skills and competencies
skills:
  - Skill 1
  - Skill 2
  - Skill 3

# Required tools
tools:
  - tool 1
  - tool 2
  - tool 3

# Workflows
workflows:
  main_workflow:
    - Step 1: Initialize and understand requirements
    - Step 2: Process domain-specific tasks
    - Step 3: Generate results and format output
    - Step 4: Quality check and validation

# Configuration options
config:
  # Template storage path
  template_path: "./templates"

  # Document output path
  output_path: "./output"

  # Data storage path
  data_path: "./data"

  # Backup settings
  backup_enabled: true
  backup_interval: "daily"

  # Performance settings
  cache_enabled: true
  cache_ttl: 3600

  # Access control
  access_control:
    admin: ["admin"]
    editor: ["team"]
    viewer: ["guest"]

# Quality assurance
quality_assurance:
  - Checklist validation
  - Output formatting
  - Error handling
  - Performance monitoring
EOF

# Create workflow template
cat > "$AGENT_NAME/workflows/main-workflow.yaml" << EOF
name: main_workflow
description: Main workflow for $AGENT_DOMAIN tasks

steps:
  1:
    name: initialization
    description: Initialize the agent and understand requirements
    actions:
      - Load configuration
      - Validate inputs
      - Set up environment

  2:
    name: processing
    description: Process domain-specific tasks
    actions:
      - Apply domain knowledge
      - Execute specialized skills
      - Generate intermediate results

  3:
    name: output_generation
    description: Generate final results and format output
    actions:
      - Format results according to standards
      - Apply quality checks
      - Prepare delivery documents

  4:
    name: validation
    description: Validate results and perform quality assurance
    actions:
      - Check completeness
      - Verify accuracy
      - Validate format
      - Perform final review

error_handling:
  - Retry failed steps up to 3 times
  - Log detailed error messages
  - Provide fallback mechanisms
  -escalate_to_main: true
EOF

# Create a basic template directory
mkdir -p "$AGENT_NAME/templates"

# Create a sample template
cat > "$AGENT_NAME/templates/sample-template.yaml" << EOF
# Template for $AGENT_DOMAIN tasks
# Copy and modify this template for specific use cases

metadata:
  name: sample-task
  version: 1.0.0
  created: $(date -I)
  domain: $AGENT_DOMAIN

requirements:
  - Requirement 1
  - Requirement 2
  - Requirement 3

parameters:
  param1: "default_value_1"
  param2: "default_value_2"
  param3: "default_value_3"

output_format:
  type: "document"
  structure:
    - Introduction
    - Main Content
    - Analysis
    - Conclusion
    - References

quality_checks:
  - Completeness check
  - Format validation
  - Accuracy verification
EOF

# Create a basic script for agent management
cat > "$AGENT_NAME/scripts/agent-setup.sh" << 'EOF'
#!/bin/bash
# Agent-specific setup script

AGENT_NAME="$(basename "$(dirname "$0")")"
echo "Setting up $AGENT_NAME..."

# Create necessary directories
mkdir -p data/{cache,logs,backups}
mkdir -p output/{drafts,final,archive}

# Set permissions
chmod 755 data/{cache,logs,backups}
chmod 755 output/{drafts,final,archive}

# Initialize configuration
echo "Configuration initialized for $AGENT_NAME"

# Run initial validation
if [ -f "../agent-config.yaml" ]; then
    echo "Configuration file found and valid"
else
    echo "Error: Configuration file not found"
    exit 1
fi

echo "Setup complete for $AGENT_NAME"
EOF

# Make the setup script executable
chmod +x "$AGENT_NAME/scripts/agent-setup.sh"

# Create a README file
cat > "$AGENT_NAME/README.md" << EOF
# $AGENT_NAME

$AGENT_DESCRIPTION

## Directory Structure

\`\`\`
$AGENT_NAME/
├── agent-config.yaml     # Main configuration file
├── workflows/           # Domain-specific workflows
│   └── main-workflow.yaml
├── templates/           # Templates and examples
│   └── sample-template.yaml
├── data/               # Data storage
│   ├── cache/         # Cached results
│   ├── logs/          # Activity logs
│   └── backups/       # Backup files
├── output/             # Generated output
│   ├── drafts/        # Draft versions
│   ├── final/         # Final versions
│   └── archive/       # Archived work
├── scripts/            # Agent scripts
│   └── agent-setup.sh
└── references/         # Domain knowledge and documentation
\`\`\`

## Quick Start

1. **Setup the agent**:
   \`\`\`bash
   cd $AGENT_NAME
   ../scripts/agent-setup.sh
   \`\`\`

2. **Configure your agent** by editing \`agent-config.yaml\`

3. **Create workflows** in the \`workflows/\` directory

4. **Use templates** from the \`templates/\` directory

5. **Run tasks** using the main workflow

## Configuration

Edit \`agent-config.yaml\` to customize:
- Agent responsibilities and skills
- Required tools and dependencies
- Workflow configurations
- Performance settings
- Quality assurance parameters

## Workflows

The main workflow is defined in \`workflows/main-workflow.yaml\`:
1. **Initialization**: Load configuration and validate inputs
2. **Processing**: Execute domain-specific tasks
3. **Output Generation**: Format and prepare results
4. **Validation**: Quality checks and final review

## Templates

Use \`templates/sample-template.yaml\` as a starting point for creating task-specific templates.

## Scripts

- \`scripts/agent-setup.sh\`: Initial setup and directory creation
- Add custom scripts as needed for your domain

## Quality Assurance

The agent includes built-in quality checks:
- Input validation
- Process monitoring
- Output verification
- Error handling and recovery

## Maintenance

- Regular backups: Daily automated backups to \`data/backups/\`
- Log rotation: Logs stored in \`data/logs/\`
- Performance monitoring: Cache management in \`data/cache/\`

## Support

For issues or questions:
1. Check the logs in \`data/logs/\`
2. Review configuration in \`agent-config.yaml\`
3. Validate workflows in \`workflows/\`
EOF

# Create initial references
cat > "$AGENT_NAME/references/domain-overview.md" << EOF
# $AGENT_NAME Domain Overview

## Domain: $AGENT_DOMAIN

### Key Concepts
- Concept 1: Description of key concept 1
- Concept 2: Description of key concept 2
- Concept 3: Description of key concept 3

### Best Practices
- Practice 1: Description of best practice 1
- Practice 2: Description of best practice 2
- Practice 3: Description of best practice 3

### Common Challenges
- Challenge 1: Description and solutions
- Challenge 2: Description and solutions
- Challenge 3: Description and solutions

### Resources
- Resource 1: Link or description
- Resource 2: Link or description
- Resource 3: Link or description
EOF

echo "✅ Agent '$AGENT_NAME' created successfully!"
echo "📁 Location: $AGENT_NAME/"
echo "🔧 Run 'cd $AGENT_NAME && ./scripts/agent-setup.sh' to initialize"
echo "📋 Edit 'agent-config.yaml' to customize configuration"
echo "📚 Read 'README.md' for detailed usage instructions"
