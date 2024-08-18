resource "aws_vpc" "main" {
  cidr_block = var.vpc_id

  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "vpc-farmingassist"
  }
}