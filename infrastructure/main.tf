terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}
provider "aws" {
  region  = "ap-southeast-1"
}

resource "aws_vpc" "prod_vpc" {
  cidr_block = "10.0.0.0/16"
}

// Creating the internet gateway

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.prod_vpc.id

  
}

// I w

resource "aws_route_table" "main_route_table" {
  vpc_id = aws_vpc.prod_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  

 
}

resource "aws_route_table" "private_route_table_1"{
  vpc_id = aws_vpc.prod_vpc.id
  route{
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat-1.id
  }
}

resource "aws_route_table_association" "private_1" {
  subnet_id      = aws_subnet.private_subnet_1.id
  route_table_id = aws_route_table.private_route_table_1.id
}


resource "aws_route_table" "private_route_table_2"{
  vpc_id = aws_vpc.prod_vpc.id
  route{
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat-2.id
  }
}


resource "aws_route_table_association" "private_2" {
  subnet_id      = aws_subnet.private_subnet_2.id
  route_table_id = aws_route_table.private_route_table_2.id
}

// I will create four subnets,two public subnets and two private subnets for failover
// First subnet would be 10.0.0.0/18
// Second subnet would be 10.0.64.0/18

// Third subnet would be  10.0.128.0/18
// Fourth subnet would be 10.0.192.0/18
resource "aws_subnet" "public_subnet_one" {
  vpc_id     = aws_vpc.prod_vpc.id
  cidr_block = "10.0.0.0/18"
  availability_zone = "ap-southeast-1a"

  tags = {
    Name = "Public Subnet 1"
  }

  
}
resource "aws_subnet" "public_subnet_two" {
  vpc_id     = aws_vpc.prod_vpc.id
  cidr_block = "10.0.64.0/18"
  availability_zone = "ap-southeast-1b"

  tags = {
    Name = "Public Subnet 2"
  }

  
}
resource "aws_nat_gateway" "nat-1" {
  allocation_id = aws_eip.nat-1.id
  subnet_id     = aws_subnet.public_subnet_one.id

  tags = {
    Name = "nat-gateway-1"
  }

  depends_on = [aws_internet_gateway.gw]
}
resource "aws_nat_gateway" "nat-2" {
  allocation_id = aws_eip.nat-2.id
  subnet_id     = aws_subnet.public_subnet_two.id

  tags = {
    Name = "nat-gateway-2"
  }

  depends_on = [aws_internet_gateway.gw]
}

resource "aws_subnet" "private_subnet_1" {
  vpc_id                  = aws_vpc.prod_vpc.id
  cidr_block              = "10.0.128.0/18"
  availability_zone       = "ap-southeast-1a"  # Adjust to your preferred AZ
  map_public_ip_on_launch = false
  tags = {
    Name = "Private Subnet 1"
  }
}

resource "aws_subnet" "private_subnet_2" {
  vpc_id                  = aws_vpc.prod_vpc.id
  cidr_block              = "10.0.192.0/18"
  availability_zone       = "ap-southeast-1b"  # Adjust to your preferred AZ
  map_public_ip_on_launch = false
  tags = {
    Name = "Private Subnet 2"
  }
}

// Route table association
resource "aws_route_table_association" "public_subnet_1_association" {
  subnet_id      = aws_subnet.public_subnet_one.id
  route_table_id = aws_route_table.main_route_table.id
}
resource "aws_route_table_association" "public_subnet_2_association" {
  subnet_id      = aws_subnet.public_subnet_two.id
  route_table_id = aws_route_table.main_route_table.id
}

// this is the first 

resource "aws_eip" "nat-1" {
  # domain ="vpc"
  tags = {
    Name = "nat-eip-1"
  }
}

resource "aws_eip" "nat-2" {
  # domain = "vpc"
  tags = {
    Name = "nat-eip-2"
  }
}

resource "aws_security_group" "jump_host_sg" {
  name        = "jump-host-sg"
  description = "Security group for the jump host"
  vpc_id = aws_vpc.prod_vpc.id

  

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_vpc_security_group_ingress_rule" "jumphost_allow_ssh" {
  security_group_id = aws_security_group.jump_host_sg.id
  ip_protocol = "tcp"
  from_port = 22
  to_port = 22
  cidr_ipv4 = "0.0.0.0/0"
}


resource "aws_vpc_security_group_ingress_rule" "jumphost_allow_all" {
  security_group_id = aws_security_group.jump_host_sg.id
  ip_protocol = -1
  cidr_ipv4 = "0.0.0.0/0"

  
}

# Create the Jump Host EC2 Instance
resource "aws_instance" "jump_host" {
  ami           = "ami-060e277c0d4cce553"  # Replace with the AMI ID you want to use
  instance_type = "t2.micro"               # Adjust the instance type as needed
  key_name      = "jumphost-key"        # Replace with your existing key pair name
  subnet_id     = aws_subnet.public_subnet_one.id       # Replace with your public subnet ID

  vpc_security_group_ids = [aws_security_group.jump_host_sg.id]
  associate_public_ip_address = true

  tags = {
    Name = "JumpHost"
  }

  # Optionally, add user_data script if needed
  
}

resource "aws_security_group" "app_instance_sg" {
  vpc_id = aws_vpc.prod_vpc.id
  name = "Application SSH Security Group"

 

  
}

resource "aws_vpc_security_group_ingress_rule" "app_allow_ssh" {
  security_group_id = aws_security_group.app_instance_sg.id
  ip_protocol = "tcp"
  from_port = 22
  to_port = 22
  referenced_security_group_id =aws_security_group.jump_host_sg.id
}

resource "aws_vpc_security_group_ingress_rule" "app_allow_backend" {
  security_group_id = aws_security_group.app_instance_sg.id
  ip_protocol = "tcp"
  from_port = 3000
  to_port = 3000
  referenced_security_group_id =aws_security_group.lb_sg.id
}

resource "aws_vpc_security_group_egress_rule" "app_allow_outbound" {
  security_group_id = aws_security_group.app_instance_sg.id
  ip_protocol = -1
  cidr_ipv4 = "0.0.0.0/0"
}

data "aws_eip" "jump_host_eip" {

  public_ip ="52.221.10.28"
  
}

resource "aws_eip_association" "jump_host_eip" {
  instance_id   = aws_instance.jump_host.id
  allocation_id = data.aws_eip.jump_host_eip.id
}



resource "aws_instance" "app_instance_1" {
  ami           = "ami-060e277c0d4cce553"  # Replace with the AMI ID you want to use
  instance_type = "t2.micro"
  key_name      = "server1-key"                # Replace with your existing key pair name
  subnet_id     = aws_subnet.private_subnet_1.id
  private_ip = "10.0.188.247"
  iam_instance_profile = aws_iam_instance_profile.ec2_instance_profile.name

  vpc_security_group_ids = [aws_security_group.app_instance_sg.id]

  tags = {
    Name = "Application 1 in Subnet 1"
  }
}

resource "aws_instance" "app_instance_2" {
  ami           = "ami-060e277c0d4cce553"  # Replace with the AMI ID you want to use
  instance_type = "t2.micro"
  key_name      = "server2-key"                # Replace with your existing key pair name
  subnet_id     = aws_subnet.private_subnet_2.id
  private_ip = "10.0.237.165"
  iam_instance_profile = aws_iam_instance_profile.ec2_instance_profile.name

  vpc_security_group_ids = [aws_security_group.app_instance_sg.id]

  tags = {
    Name = "Application 2 in Subnet 2"
  }
}



# # Output the public IP of the jump host


# resource "aws_security_group" "lb_sg" {
#   name        = "lb-sg"
#   description = "Security group for the load balancer"
#   vpc_id      = aws_vpc.prod_vpc.id

  

#   tags = {
#     Name = "Load Balancer "
#   }
# }

# resource "aws_vpc_security_group_ingress_rule" "lb_allow_http" {
#   security_group_id = aws_security_group.lb_sg.id
#   ip_protocol = "tcp"
#   from_port = 80
#   to_port = 80
#   cidr_ipv4 = "0.0.0.0/0"
# }

# resource "aws_vpc_security_group_ingress_rule" "lb_allow_https" {
#   security_group_id = aws_security_group.lb_sg.id
#   ip_protocol = "tcp"
#   from_port = 443
#   to_port = 443
#   cidr_ipv4 = "0.0.0.0/0"
# }

# resource "aws_vpc_security_group_egress_rule" "lb_allow_outbound" {
#   security_group_id = aws_security_group.lb_sg.id
#   ip_protocol = -1
#   cidr_ipv4 = "0.0.0.0/0"
# }

# resource "aws_lb" "app_lb" {

#   name = "appLoadBalancer"
#   internal = false
#   load_balancer_type = "application"
#   // Set the 
#   security_groups = [aws_security_group.lb_sg.id]
#   subnets = [aws_subnet.public_subnet_one.id,aws_subnet.public_subnet_two.id]
#   enable_cross_zone_load_balancing = true
  
# }

# resource "aws_lb_listener" "https" {
#   load_balancer_arn = aws_lb.app_lb.arn
#   port              = "443"
#   protocol          = "HTTPS"
#   ssl_policy        = "ELBSecurityPolicy-2016-08"
#   certificate_arn   = "arn:aws:acm:ap-southeast-1:554303516766:certificate/44078c9c-9908-4628-9982-eaadd3a904b5"

#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.app_tg.arn
#   }
# }

# resource "aws_lb_listener" "http" {
#   load_balancer_arn = aws_lb.app_lb.arn
#   port              = "80"
#   protocol          = "HTTP"

#   default_action {
#     type = "redirect"

#     redirect {
#       protocol = "HTTPS"
#       port     = "443"
#       status_code = "HTTP_301"
#     }
#   }
# }


# resource "aws_lb_target_group" "app_tg" {
#   name        = "app-target-group"
#   port        = 3000
#   protocol    = "HTTP"
#   vpc_id      = aws_vpc.prod_vpc.id
#   target_type = "instance"

#   health_check {
#     path                = "/"
#     interval            = 30
#     timeout             = 5
#     healthy_threshold   = 5
#     unhealthy_threshold = 2
#     matcher             = "404"
#   }

#   tags = {
#     Name = "Application Target Group"
#   }
# }


# resource "aws_lb_target_group_attachment" "app_instance_1" {
#   target_group_arn = aws_lb_target_group.app_tg.arn
#   target_id        = aws_instance.app_instance_1.id
#   port             = 3000
# }

# resource "aws_lb_target_group_attachment" "app_instance_2" {
#   target_group_arn = aws_lb_target_group.app_tg.arn
#   target_id        = aws_instance.app_instance_2.id
#   port             = 3000
# }






# output "jump_host_public_ip" {
#   value = aws_instance.jump_host.public_ip
# }

# output "loadbalancer_public_ip"{
#   value = aws_lb.app_lb.dns_name
# }



# S3 bucket to store athena output data
# resource "aws_s3_bucket" "athena_output" {
#   bucket = "isb-raw-data-athena-output"

#   tags = {
#     Name        = "My bucket"
#     Environment = "Dev"
#   }
# }

# Athena Workgroup
resource "aws_athena_workgroup" "athena_workgroup" {
  name = "JsonQuery"

  configuration {
    enforce_workgroup_configuration    = true
    publish_cloudwatch_metrics_enabled = true

    result_configuration {
      output_location = "s3://isb-raw-data-athena-output/"
    }
  }
}

# Athena Database
resource "aws_athena_database" "athena_db" {
  name   = "s3jsondb"
  bucket = "isb-raw-data-athena-output"
}

# Structured Table in Athena Database for timeTaken
resource "aws_glue_catalog_table" "athena_table_time" {
  database_name = "s3jsondb"
  name          = "timetaken"

  table_type = "EXTERNAL_TABLE"

  storage_descriptor {
    columns {
      name = "userID"
      type = "string"
    }
    columns {
      name = "eventType"
      type = "string"
    }
    columns {
      name = "event"
      type = "string"
    }
    columns {
      name = "timestamp"
      type = "string"
    }
    columns {
      name = "time"
      type = "int"
    }

    location = "s3://isb-raw-data-athena/timeTaken/"

    input_format  = "org.apache.hadoop.mapred.TextInputFormat"
    output_format = "org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat"

    ser_de_info {
      serialization_library = "org.openx.data.jsonserde.JsonSerDe"
      parameters = {
        "ignore.malformed.json" = "FALSE"
        "dots.in.keys"          = "FALSE"
        "case.insensitive"      = "TRUE"
        "mapping"               = "TRUE"
      }
    }
  }

  parameters = {
    "classification" = "json"
  }

  depends_on = [aws_athena_database.athena_db]
}

# Structured Table in Athena Database for attemptsTaken
resource "aws_glue_catalog_table" "athena_table_attempts" {
  database_name = "s3jsondb"
  name          = "attemptstaken"

  table_type = "EXTERNAL_TABLE"

  storage_descriptor {
    columns {
      name = "userID"
      type = "string"
    }
    columns {
      name = "eventType"
      type = "string"
    }
    columns {
      name = "event"
      type = "string"
    }
    columns {
      name = "timestamp"
      type = "string"
    }
    columns {
      name = "attempts"
      type = "int"
    }

    location = "s3://isb-raw-data-athena/attemptsTaken/"

    input_format  = "org.apache.hadoop.mapred.TextInputFormat"
    output_format = "org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat"

    ser_de_info {
      serialization_library = "org.openx.data.jsonserde.JsonSerDe"
      parameters = {
        "ignore.malformed.json" = "FALSE"
        "dots.in.keys"          = "FALSE"
        "case.insensitive"      = "TRUE"
        "mapping"               = "TRUE"
      }
    }
  }

  parameters = {
    "classification" = "json"
  }

  depends_on = [aws_athena_database.athena_db]
}

resource "aws_iam_role" "ec2_role" {
  name = "ec2_role"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })

  tags = {
    tag-key = "tag-value"
  }
}

resource "aws_iam_role_policy" "ec2_role_policy" {
  name = "ec2-role-policy"
  role = aws_iam_role.ec2_role.id

  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Resource": "*"
      }
    ]
  })
}

resource "aws_iam_instance_profile" "ec2_instance_profile" {
  name = "ec2-instance-profile"
  role = aws_iam_role.ec2_role.name
}

resource "aws_cloudwatch_log_group" "my_log_group" {
  name = "iqma-log-group"
}



